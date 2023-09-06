def insert_row(cur, table, cols, values):
    cur.execute(f"INSERT INTO {table}({cols}) VALUES {str(values)}")

def select(cur, table, cols, cond):
    cur.execute(f"SELECT {cols} FROM {table} WHERE {cond};")
