import os
import dotenv
from database.schema import db_setup_schema
from database.operations import insert_row
import psycopg
import sqlite3


# load environment variables from .env file
dotenv.load_dotenv(f"{os.getcwd()}/.env.local")


def db_uri(prod=0):
    pg_connection_dict = {
        "dbname": os.environ["POSTGRES_DATABASE"],
        "user": os.environ["POSTGRES_USER"],
        "password": os.environ["POSTGRES_PASSWORD"],
        "port": os.environ["POSTGRES_PORT"],
        "host": os.environ["POSTGRES_HOST"],
    }
    return pg_connection_dict if prod else {"database": "testdb.sqlite3"}


def db_connector(prod=0):
    dbmod = psycopg if prod else sqlite3
    print(db_uri(prod))
    return lambda: dbmod.connect(**db_uri(prod))


def db_test_init(cur):
    # Create tables and insert dummy data if this is testing db
        db_setup_schema(cur)
        insert_row(
            cur,
            "Mbti",
            "MbtiID, MbtiDescr",
            ("ENTJ", "extraversion, intuition, thinking, judgment")
        )
        insert_row(
            cur,
            "Mbti",
            "MbtiID, MbtiDescr",
            ("ISFP", "introversion, sensing, feeling, perception")
        )
