def insert_row(cur, table, cols, values):
    cur.execute(f"INSERT INTO {table}({cols}) VALUES {str(values)}")


def select(cur, table, cols, cond):
    if cond:
        cur.execute(f"SELECT {cols} FROM {table} WHERE {cond};")
    else:
        cur.execute(f"SELECT {cols} FROM {table};")


def update(cur, table, pairs, cond):
    cur.execute(
        f"""UPDATE {table} SET {
            ','.join(map(lambda t: f'{t[0]}={t[1]}', pairs))
        } WHERE {cond};"""
    )
 

def delete(cur, table, cond):
    cur.execute(f"DELETE FROM {table} WHERE {cond};")
