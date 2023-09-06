def create_table_str(name, attributes, primary):
    l = [f"CREATE TABLE {name} ("]
    for t in attributes:
        attrname, attrtype = t[0], t[1]
        l.append(f"{attrname} {attrtype}, ")
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
            ("OrganisationID", "INTEGER"),
            ("OrganisationName", "VARCHAR(255)"),
            ("OrganisationLogo", "BLOB"),
            ("OrganisationDesc", "VARCHAR(65535)")
        ],
        "Users": [
            "UserID",
            ("UserID", "INTEGER"),
            ("UserName", "VARCHAR(255) UNIQUE"),
            ("UserEmail", "VARCHAR(255)"),
            ("UserPwHash", "VARCHAR(255)"),
            ("UserPwSalt", "VARCHAR(255)"),
            ("UserHours", "INTEGER"),
        ],
        "UserOrg": [
            "UserOrgUID, UserOrgOID",
            ("UserOrgUID", "INTEGER", "Users", "UserID"),
            ("UserOrgOID", "INTEGER", "Organisations", "OrganisationID"),
        ],
        "MbtiMatch": [
            "MbtiMatchOID",
            ("MbtiMatchOID", "INTEGER", "Organisations", "OrganisationID"),
            ("MbtiMatchMID", "VARCHAR(4)", "Mbti", "MbtiID"),
        ],
        "Mbti": [
            "MbtiID",
            ("MbtiID", "VARCHAR(4)"),
            ("MbtiDescr", "VARCHAR(4)"),
        ],
    }
    for name, attrs in tables.items():
        print(create_table_str(name, attrs[1:], attrs[0]))
        cur.execute(create_table_str(name, attrs[1:], attrs[0]))
