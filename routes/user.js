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
  res.send(newUser);
});
router.post("/login", async (req, res) => {});

module.exports = router;
