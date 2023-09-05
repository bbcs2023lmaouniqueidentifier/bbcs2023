import psycopg
import os
import dotenv

# absolute path to the directory where this file is located
abs_fp = os.path.dirname(os.path.abspath(__file__))

# load environment variables from .env file
dotenv.load_dotenv(f'{os.getcwd()}/.env.local')

pg_connection_dict = {
    'dbname': os.environ['POSTGRES_DATABASE'],
    'user': os.environ['POSTGRES_USER'],
    'password': os.environ['POSTGRES_PASSWORD'],
    'port': os.environ['POSTGRES_PORT'],
    'host': os.environ['POSTGRES_HOST'],
}


def hello():
  connection = psycopg.connect(**pg_connection_dict)
  cur = connection.cursor()
  cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "abc'def"))
  cur.execute("SELECT * FROM test;")
  cur.fetchone()
  connection.commit()
  cur.close()
