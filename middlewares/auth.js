const jwt = require("jsonwebtoken");
require("dotenv").config();
function auth(req, res, next) {
  console.log(req.headers);
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Not authenticated!" });
  } else {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) res.status(401).send({ message: err.message });
      req.user = decoded;
  next();
  //   });
  // }
}

module.exports = auth;
