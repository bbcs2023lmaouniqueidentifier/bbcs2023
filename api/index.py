from flask import Flask, request, jsonify

import os
import sys

sys.path.append(os.getcwd())
from database.boot import db_connector, db_init
from database.operations import insert_row, select, update


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
try:
    os.remove("testdb.sqlite3")  # breh
except:
    pass
conn_mk = db_connector(prod)


def setup_db():
    if initdb or not prod:
        conn = conn_mk()
        cur = conn.cursor()
        db_init(cur)
        if initdb:
            print("PLEASE KILL SERVER NOW")
        cur.close()
        conn.commit()
        conn.close()


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
    insert_row(
        cur,
        "Users",
        "UserName, UserEmail, UserPwHash, UserPwSalt, UserHours",
        (uname, email, pwhash, salt(), 0),
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), 200


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
    corr_cred = check_password(cur, uname, passwd)
    cur.close()
    conn.close()
    if corr_cred:
        return jsonify({}), 200
    else:
        return jsonify({}), 401


@app.route("/api/emailchange", methods=["POST"])
def emailchange():
    uname = get_json()["username"]
    passwd = get_json()["password"]
    newemail = get_json()["newemail"]

    conn = conn_mk()
    cur = conn.cursor()
    corr_cred = check_password(cur, uname, passwd)
    if corr_cred:
        update(cur, "Users", [("UserEmail", repr(newemail))], f"UserName='{uname}'")
        status = 200
    else:
        status = 401
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
    corr_cred = check_password(cur, uname, passwd)
    if corr_cred:
        insert_row(
            cur,
            "Opportunities",
            "OpportunityName, OpportunityCreator, OpportunityLogo, OpportunityDesc",
            (oppname, uname, opplogo, oppdesc),
        )
        status = 200
    else:
        status = 401
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), status


@app.route("/api/leak", methods=["GET"])
def index():
    conn = conn_mk()
    cur = conn.cursor()
    rows = cur.execute(f"SELECT * FROM {request.args['table']};").fetchall()
    cols = list(
        map(
            lambda l: l[1],
            cur.execute(f"PRAGMA table_info({request.args['table']});").fetchall(),
        )
    )
    cur.close()
    conn.close()
    return jsonify(list(map(lambda row: {k: v for k, v in zip(cols, row)}, rows)))
