def hello(conn):
    cur = conn.cursor()
    conn.commit()
    print(cur.execute("SELECT * FROM Mbti;").fetchall())
    cur.close()
    conn.close()
