db.auth("admin_user", "admin_pass");
rs.initiate({
  _id: "rs1",
  version: 1,
  members: [
    { _id: 0, host: "mongodb_server_lynx:27017" },
    { _id: 1, host: "mongodb_server_puma:27017" },
    { _id: 2, host: "mongodb_server_wolf:27017" },
  ],
});
