def create_table_str(name, attributes, primary):
    l = [f"CREATE TABLE {name} ("]
    for t in attributes:
        attrname, attrtype = t[0], t[1]
        l.append(f"{attrname} {attrtype}, ")
    for t in attributes:
        if len(t) == 4:
            l += f" FOREIGN KEY ({t[0]}) REFERENCES {t[2]}({t[3]}), "
    l.append(f" CONSTRAINT {name}PK PRIMARY KEY ({primary}) ")
    l.append(");")
    return "".join(l)


def db_setup_schema(cur):
    tables = {
        "Users": [
            "UserName",
            ("UserName", "VARCHAR(255) UNIQUE"),
            ("UserEmail", "VARCHAR(255)"),
            ("UserPwHash", "VARCHAR(255)"),
            ("UserPwSalt", "VARCHAR(255)"),
            ("UserHours", "INTEGER"),
            ("UserHoursUpdate", "INTEGER"),
            ("UserMbti", "VARCHAR(4)"),
        ],
        "Opportunities": [
            "OpportunityName",
            ("OpportunityName", "VARCHAR(255)"),
            ("OpportunityCreator", "VARCHAR(255)", "Users", "UserName"),
            ("OpportunityLogo", "TEXT"),  # base64-encoded png
            ("OpportunityDesc", "VARCHAR(65535)"),
        ],
        "UserOpp": [
            "UserOppUName, UserOppOName",
            ("UserOppUName", "VARCHAR(255)", "Users", "UserName"),
            ("UserOppOName", "VARCHAR(255)", "Opportunities", "OpportunityName"),
        ],
        "MbtiMatch": [
            "MbtiMatchOName, MbtiCat",
            ("MbtiMatchOName", "VARCHAR(255)", "Opportunities", "OpportunityName"),
            ("MbtiCat", "VARCHAR(4)"),
        ],
    }
    for name, attrs in tables.items():
        print(create_table_str(name, attrs[1:], attrs[0]))
        cur.execute(create_table_str(name, attrs[1:], attrs[0]))
