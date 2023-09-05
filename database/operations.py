def insert_row(cur, table, cols, values):
    cur.execute(f"INSERT INTO {table}({cols}) VALUES {str(values)}")
