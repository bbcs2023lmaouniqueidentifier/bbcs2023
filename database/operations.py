zipwith = lambda f, l1, l2: map(lambda t: f(t[0], t[1]), zip(l1, l2))


def insert_row(cur, table, cols, values):
    cur.execute(f"INSERT INTO {table}({cols}) VALUES {str(values)}")


def select(cur, table, cols, cond):
    cur.execute(f"SELECT {cols} FROM {table} WHERE {cond};")


def update(cur, table, pairs, cond):
    cur.execute(
        f"""UPDATE {table} SET {
            ','.join(map(lambda t: f'{t[0]}={t[1]}', pairs))
        } WHERE {cond};"""
    )