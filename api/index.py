from flask import Flask, request, jsonify
from flask_cors import CORS
from time import time
from collections import defaultdict

import os
import sys
from itertools import product

sys.path.append(os.getcwd())
from database.boot import db_connector
from database.operations import insert_row, select, update, delete


# Crypto
# ERROR: CHANGE CHANGE PLS CHANGE
salt = lambda: ""
hash = lambda x: x


# Set up database
# Who needs pooling smh
conn_mk = db_connector("PROD" in os.environ)

app = Flask(__name__)
CORS(app)


def get_json():
    if not request.json:
        raise Exception("Invalid format")

    return request.json


class BadUsernameException(BaseException):
    pass


@app.route("/api/register", methods=["POST"])
def register():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    email = get_json()["email"]
    pwhash = hash(passwd + salt())

    conn = conn_mk()
    cur = conn.cursor()
    status = 500

    try:
        select(cur, "Users", "UserName", f"UserName='{uname}'")
        if len(cur.fetchall()) == 0:
            insert_row(
                cur,
                "Users",
                "UserName, UserEmail, UserPwHash, UserPwSalt, UserHours, UserHoursUpdate, UserMbti",
                (uname, email, pwhash, salt(), 0, 0, ""),
            )
            
            select(cur, "Users", "UserEmail, UserHours, UserMbti", f"UserName='{uname}'")
            email, hours, mbti = cur.fetchone()
            ret = {"username": uname, "email": email, "hours": hours, "mbti": mbti}
            status = 200
        else:
            status = 409
    except Exception:
        pass

    conn.commit()
    cur.close()
    conn.close()
    if status != 200:
        return jsonify({}), status
    return jsonify(ret), status


def check_password(cur, uname, passwd):
    try:
        select(cur, "Users", "UserPwHash, UserPwSalt", f"UserName='{uname}'")
        pwhash, pwsalt = cur.fetchone()
        return hash(passwd + pwsalt) == pwhash
    except:
        raise BadUsernameException()  # probably


@app.route("/api/login", methods=["POST"])
def login():
    uname = get_json()["username"]
    passwd = get_json()["password"]

    conn = conn_mk()
    cur = conn.cursor()
    status = 500

    ret = {}
    try:
        status = 200 if check_password(cur, uname, passwd) else 401
        select(cur, "Users", "UserEmail, UserHours, UserMbti", f"UserName='{uname}'")
        email, hours, mbti = cur.fetchone()
        ret = {"username": uname, "email": email, "hours": hours, "mbti": mbti}
    except BadUsernameException:
        status = 401    
    except Exception:
        status = 401  # ???
    cur.close()
    conn.close()

    return jsonify(ret), status


@app.route("/api/emailchange", methods=["POST"])
def emailchange():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    newemail = get_json()["newemail"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    try:
        corr_cred = check_password(cur, uname, passwd)
        if corr_cred:
            update(cur, "Users", [("UserEmail", repr(newemail))], f"UserName='{uname}'")
            status = 200
        else:
            status = 401
    except BadUsernameException:
        status = 401
    except Exception:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/passwordchange", methods=["POST"])
def passwordchange():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    newpasswd = get_json()["newpassword"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    try:
        corr_cred = check_password(cur, uname, passwd)
        if corr_cred:
            newsalt = salt()
            newpwhash = hash(newpasswd + newsalt)
            update(
                cur,
                "Users",
                [("UserPwHash", repr(newpwhash)), ("UserPwSalt", repr(newsalt))],
                f"UserName='{uname}'",
            )
            status = 200
        else:
            status = 401
    except BadUsernameException:
        status = 401
    except Exception:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/usermbti", methods=["GET", "POST"])
def usermbti():
    if request.method == "GET":
        uname = request.args["username"]

        conn = conn_mk()
        cur = conn.cursor()

        status = 500
        ret = None
        try:
            select(cur, "Users", "UserMbti", f"UserName='{uname}'")
            ret = cur.fetchone()[0]
            status = 200
        except Exception:
            pass

        conn.commit()
        cur.close()
        conn.close()
        return jsonify(ret), status
    else:
        uname = get_json()["username"]
        newmbti = get_json()["newmbti"]

        conn = conn_mk()
        cur = conn.cursor()

        status = 500
        try:
            
            
                try:
                    update(
                        cur,
                        "Users",
                        [("UserMbti", repr(newmbti))],
                        f"UserName='{uname}'"
                    )
                    status = 200
                except:
                    status = 413  # probably
            
        except BadUsernameException:
            status = 401
        except Exception:
            pass

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({}), status


@app.route("/api/addopp", methods=["POST"])
def addopp():
    uname = get_json()["username"]
    #passwd = get_json()["password"]
    oppname = get_json()["oppname"]
    opplogo = get_json()["opplogo"]
    oppdesc = get_json()["oppdesc"]
    oppshortdesc = get_json()["oppshortdesc"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    try:
        #corr_cred = check_password(cur, uname, passwd)
        #if corr_cred:
            try:
                insert_row(
                    cur,
                    "Opportunities",
                    "OpportunityName, OpportunityCreator, OpportunityLogo, OpportunityDesc, OpportunityShortDesc",
                    (oppname, uname, opplogo, oppdesc, oppshortdesc),
                )
                status = 200
            except:
                status = 409  # probably
        #else:
            #status = 401
    except BadUsernameException:
        status = 401
    except Exception:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/getopps", methods=["GET"])
def getopps():
    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    ret = {}
    try:
        rows = cur.execute(
            "SELECT OpportunityName, OpportunityCreator, OpportunityLogo, OpportunityDesc, OpportunityShortDesc FROM Opportunities;"
        ).fetchall()
        cols = (
            "OpportunityName",
            "OpportunityCreator",
            "OpportunityLogo",
            "OpportunityDesc",
            "OpportunityShortDesc",
        )
        
            
        ret = list(map(lambda row: {k: v for k, v in zip(cols, row)}, rows))
        status = 200
    except Exception:
        pass

    cur.close()
    conn.close()
    return jsonify(ret), status


@app.route("/api/assignmbtis", methods=["POST"])
def assignmbtis():
    uname = get_json()["username"]
    #passwd = get_json()["password"]
    opp = get_json()["oppname"]
    mbtis = get_json()["mbtis"]
    mbtis_parsed = product(
        [k for k in "EI" if k in mbtis],
        [k for k in "SN" if k in mbtis],
        [k for k in "TF" if k in mbtis],
        [k for k in "JP" if k in mbtis]
    )
    
    conn = conn_mk()
    cur = conn.cursor()
    status = 500
    try:
        select(cur, "Opportunities", "OpportunityCreator", f"OpportunityName='{opp}'")
        creator = cur.fetchone()[0]

        if creator != uname:
            status = 403
            raise Exception
        #if not check_password(cur, uname, passwd):
            status = 401
            raise Exception
        delete(cur, "MbtiMatch", f"MbtiMatchOName='{opp}'")
        for mbti in mbtis_parsed:
           
            insert_row(cur, "MbtiMatch", "MbtiMatchOName, MbtiCat", (opp, ''.join(mbti)))
        status = 200
    except BadUsernameException:
        status = 401
    except Exception as e:
        print(e)

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/fetchmbtis", methods=["GET"])
def fetchmbtis():
    

    conn = conn_mk()
    cur = conn.cursor()
    

    status = 500
    res = defaultdict(list)
    try:
        rows = cur.execute("SELECT OpportunityName FROM Opportunities;").fetchall()
        names = [row[0] for row in rows]
        if "PROD" in os.environ:
            mbtis = cur.execute(
                    "SELECT MbtiMatchOName, MbtiCat FROM MbtiMatch WHERE MbtiMatchOName = ANY(%s);",
                    (names,),
                ).fetchall()
        else:
            mbtis = cur.execute(
                    f"SELECT MbtiMatchOName, MbtiCat FROM MbtiMatch WHERE MbtiMatchOName IN ({','.join(['?'] * len(names))});",
                    names,
                ).fetchall()
        
        for opp, mbti in mbtis:
            res[opp].append(mbti)
        status = 200
    except Exception as e:
        
        status = 404

    conn.commit()
    cur.close()
    conn.close()
    return jsonify(dict(res)), status


@app.route("/api/addhours", methods=["POST"])
def addhours():
    uname = get_json()["username"]
    extrahours = get_json()["extrahours"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    try:
        
        select(cur, "Users", "UserHours, UserHoursUpdate", f"UserName='{uname}'")
        hours, updtime = cur.fetchone()
        if time() - updtime < 72000:
            status = 409
            raise Exception
        update(
            cur,
            "Users",
            [("UserHours", hours + extrahours), ("UserHoursUpdate", time()) ],
            f"UserName='{uname}'"
        )
        status = 200
    except BadUsernameException:
        status = 401
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/fetchhours", methods=["GET"])
def fetchhours():
    uname = request.args["username"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    ret = []
    try:
        select(cur, "Users", "UserHours", f"UserName='{uname}'")
        ret = list(map(lambda t: t[0], cur.fetchall()))
        status = 200
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify(ret), status

@app.route("/api/users", methods=["GET"])
def users():
    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    ret = []
    try:
        select(cur, "Users", "UserName, UserHours, UserMbti", None)
        ret = list(map(lambda t: {"username": t[0], "hours": t[1], "mbti": t[2]}, cur.fetchall()))
        status = 200
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify(ret), status


@app.route("/api/leak", methods=["GET"])
def leak():
    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    ret = {}
    try:
        rows = cur.execute(f"SELECT * FROM {request.args['table']};").fetchall()
        cols = list(
            map(
                lambda l: l[1],
                cur.execute(f"PRAGMA table_info({request.args['table']});").fetchall(),
            )
        )
        ret = list(map(lambda row: {k: v for k, v in zip(cols, row)}, rows))
        status = 200
    except Exception:
        pass

    cur.close()
    conn.close()
    return jsonify(ret), status
