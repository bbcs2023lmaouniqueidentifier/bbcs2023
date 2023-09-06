import os
import dotenv
from database.schema import db_setup_schema


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
    dbmod = __import__("psycopg") if prod else __import__("sqlite3")
    return lambda: dbmod.connect(**db_uri(prod))


def db_init(cur):
    db_setup_schema(cur)
