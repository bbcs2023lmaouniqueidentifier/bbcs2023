from flask import Flask, request, jsonify

import os
import sys

sys.path.append(os.getcwd())
from database.boot import db_connector, db_test_init
from database.operations import insert_row


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

@app.route('/api/signup', methods=['POST'])
def signup():
    uname = request.json["username"]
    passwd = request.json["password"]
    email = request.json["email"]
    # ERROR: CHANGE CHANGE PLS CHANGE
    salt = lambda: ""
    hash = lambda x: x
    pwhash = hash(passwd + salt())

    conn = conn_mk()
    cur = conn.cursor()
    insert_row(
        cur,
        "Users",
        "UserName, UserEmail, UserPwHash, UserPwSalt, UserHours",
        (uname, email, pwhash, salt(), 0)
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({}), 200

@app.route("/api/leak")
def index():
    conn = conn_mk()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users;")
    ret = cur.fetchall()
    cur.close()
    conn.close()
    return ret
