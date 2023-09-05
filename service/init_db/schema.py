def create_table_str(name, attributes, primary):
    l = [f"CREATE TABLE {name} ("]
    for t in attributes:
        attrname, attrtype = t[0], t[1]
        l.append(f"{attrname} {attrtype} NOT NULL, ")
    for t in attributes:
        if len(t) == 4:
            l += f"FOREIGN KEY ({t[0]}) REFERENCES {t[2]}({t[3]})"
    l.append(f"CONSTRAINT {name}PK PRIMARY KEY ({primary})")
    l.append(");")
    return "".join(l)


def db_setup_schema(cur):
    tables = {
        "Organisations": [
            "OrganisationID",
            ("OrganisationID", "int"),
            ("OrganisationName", "varchar(255)"),
        ],
        "Users": [
            "UserID",
            ("UserID", "int"),
            ("UserName", "varchar(255)"),
            ("UserEmail", "varchar(255)"),
            ("UserPwHash", "varchar(255)"),
            ("UserPwSalt", "varchar(255)"),
            ("UserHours", "int"),
        ],
        "UserOrg": [
            "UserOrgUID, UserOrgOID",
            ("UserOrgUID", "int", "Users", "UserID"),
            ("UserOrgOID", "int", "Organisations", "OrganisationID"),
        ],
        "MbtiMatch": [
            "MbtiMatchOID",
            ("MbtiMatchOID", "int", "Organisations", "OrganisationID"),
            ("MbtiMatchMID", "int", "Mbti", "MbtiID"),
        ],
        "Mbti": [
            "MbtiID",
            ("MbtiID", "int"),
            ("MbtiName", "varchar(4)"),
        ],
    }
    for name, attrs in tables.items():
        cur.execute(create_table_str(name, attrs[1:], attrs[0]))

### testing
import sqlite3
db = sqlite3.connect(":memory:")
cur = db.cursor()
db_setup_schema(cur)
db.commit()

print(list(cur.execute("SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';")))
