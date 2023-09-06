from flask import Flask, request, jsonify

import os
import sys

sys.path.append(os.getcwd())
from database.boot import db_connector, db_init
from database.operations import insert_row, select, update, delete


try:
    os.environ["PROD"]
    prod = 1
except KeyError:
    prod = 0

try:
    os.environ["INITDB"]
    initdb = 1
except KeyError:
    initdb = 0

# Crypto
# ERROR: CHANGE CHANGE PLS CHANGE
salt = lambda: ""
hash = lambda x: x


# Set up database
# Who needs pooling smh
if not prod:
    try:
        os.remove("testdb.sqlite3")  # breh
    except:
        pass
conn_mk = db_connector(prod)


def setup_db():
    conn = conn_mk()
    cur = conn.cursor()
    db_init(cur)
    cur.close()
    conn.commit()
    conn.close()
    print("PLEASE KILL SERVER NOW")


if initdb or not prod:
    setup_db()

app = Flask(__name__)


def get_json():
    if not request.json:
        raise Exception("Invalid format")

    return request.json


@app.route("/api/signup", methods=["POST"])
def signup():
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
                "UserName, UserEmail, UserPwHash, UserPwSalt, UserHours",
                (uname, email, pwhash, salt(), 0),
            )
            status = 200
        else:
            status = 409
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


def check_password(cur, uname, passwd):
    select(cur, "Users", "UserPwHash, UserPwSalt", f"UserName='{uname}'")
    pwhash, pwsalt = cur.fetchone()
    return hash(passwd + pwsalt) == pwhash


@app.route("/api/login", methods=["POST"])
def login():
    uname = get_json()["username"]
    passwd = get_json()["password"]

    conn = conn_mk()
    cur = conn.cursor()
    status = 500

    try:
        status = 200 if check_password(cur, uname, passwd) else 401
    except:
        pass
    cur.close()
    conn.close()

    return jsonify({}), status


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
    except:
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
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/addopp", methods=["POST"])
def addopp():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    oppname = get_json()["oppname"]
    opplogo = get_json()["opplogo"]
    oppdesc = get_json()["oppdesc"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    try:
        corr_cred = check_password(cur, uname, passwd)
        if corr_cred:
            try:
                insert_row(
                    cur,
                    "Opportunities",
                    "OpportunityName, OpportunityCreator, OpportunityLogo, OpportunityDesc",
                    (oppname, uname, opplogo, oppdesc),
                )
                status = 200
            except:
                status = 409  # probably
        else:
            status = 401
    except:
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
            "SELECT OpportunityName, OpportunityCreator, OpportunityLogo, OpportunityDesc FROM Opportunities;"
        ).fetchall()
        cols = (
            "OpportunityName",
            "OpportunityCreator",
            "OpportunityLogo",
            "OpportunityDesc",
        )
        ret = list(map(lambda row: {k: v for k, v in zip(cols, row)}, rows))
        status = 200
    except:
        pass

    cur.close()
    conn.close()
    return jsonify(ret), status


@app.route("/api/assignmbtis", methods=["POST"])
def assignmbtis():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    opp = get_json()["oppname"]
    mbtis = get_json()["mbtis"]

    conn = conn_mk()
    cur = conn.cursor()
    status = 500
    try:
        select(cur, "Opportunities", "OpportunityCreator", f"OpportunityName='{opp}'")
        creator = cur.fetchone()[0]

        if creator != uname:
            status = 403
            raise Exception
        if not check_password(cur, uname, passwd):
            status = 401
            raise Exception
        delete(cur, "MbtiMatch", f"MbtiMatchOName='{opp}'")
        for mbti in mbtis:
            insert_row(cur, "MbtiMatch", "MbtiMatchOName, MbtiCat", (opp, mbti))
        status = 200
    except:
        pass

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/fetchmbtis", methods=["GET"])
def fetchmbtis():
    opp = request.args["oppname"]

    conn = conn_mk()
    cur = conn.cursor()

    status = 500
    ret = []
    try:
        select(cur, "MbtiMatch", "MbtiCat", f"MbtiMatchOName='{opp}'")
        ret = list(map(lambda t: t[0], cur.fetchall()))
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
    except:
        pass

    cur.close()
    conn.close()
    return jsonify(ret), status
