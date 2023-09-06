#! /usr/bin/env python

import os
import sys

sys.path.append(os.getcwd())

from database.boot import db_connector, db_init

prod = "PROD" in os.environ
if not prod:
    try:
        os.remove("testdb.sqlite3")  # breh
    except:
        pass

conn_mk = db_connector(prod)
conn = conn_mk()
cur = conn.cursor()
db_init(cur)
cur.close()
conn.commit()
conn.close()
