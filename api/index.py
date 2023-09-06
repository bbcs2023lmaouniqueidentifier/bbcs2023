from flask import Flask, request, jsonify

import os
import sys

sys.path.append(os.getcwd())
from database.boot import db_connector, db_test_init
from database.operations import insert_row, select


# Auth
# ERROR: CHANGE CHANGE PLS CHANGE
salt = lambda: ""
hash = lambda x: x


# Set up database
# Who needs pooling smh
try:
    os.remove("testdb.sqlite3")  # breh
except:
    pass
conn_mk = db_connector()


def setup_db():
    conn = conn_mk()
    cur = conn.cursor()
    db_test_init(cur)
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


@app.route("/api/login", methods=["POST"])
def login():
    uname = get_json()["username"]
    passwd = get_json()["password"]

    conn = conn_mk()
    cur = conn.cursor()
    select(cur, "Users", "UserPwHash, UserPwSalt", f"UserName='{uname}'")
    pwhash, pwsalt = cur.fetchone()
    if hash(passwd + pwsalt) == pwhash:
        return jsonify({}), 200
    else:
        return jsonify({}), 401


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
