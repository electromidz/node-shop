const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const userModel = require("../models/user");

async function hashPass(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

router.post("/register", async (req, res) => {
  req.body.password = await hashPass(req.body.password);
  // res.send(req.body);
  const newUser = new userModel(req.body);
  await newUser.save();
  res.status(201);
  res.send(newUser);
});
router.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;
  const foundUser = await userModel.findOne({
    $or: [{ email }, { phone }, { password }],
  });

  const user = await bcrypt.compareSync(password, foundUser.password); // true

  if (user && foundUser) {
    res.status(200);
    return res.send(foundUser);
  } else if (!user) {
    res.status(401);
    res.send({ error: "Wrong password" });
  } else {
    res.status(404);
    res.send({ error: "User not found!" });
  }
});

module.exports = router;
