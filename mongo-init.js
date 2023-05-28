db.auth("admin_user", "admin_pass");
db = db.getSiblingDB("application_database");
db.createUser({
  user: "application_user",
  pwd: "application_pass",
  roles: [
    {
      role: "dbOwner",
      db: "application_database",
    },
  ],
});
