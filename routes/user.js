require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userModel = require("../models/user");

async function hashPass(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

router.post("/register", async (req, res) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .min(3)
      .max(320)
      .required()
      .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required()
      .pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
    password: Joi.string().required().min(6).max(20),
  });
  const userValidation = userSchema.validate(req.body);
  console.log("Validation::", userValidation);
  return 0;
  req.body.password = await hashPass(req.body.password);
  const newUser = new userModel(req.body);
  if (newUser) {
    await newUser.save();
    res.status(201);
    res.send(newUser);
  } else {
    res.status(404);
    res.send({ error: "Invalid form" });
  }
});
router.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;
  const foundUser = await userModel.findOne({
    $or: [{ email }, { phone }, { password }],
  });

  const user = await bcrypt.compareSync(password, foundUser.password); // true

  if (user && foundUser) {
    const token = jwt.sign(
      { _id: foundUser._id, name: foundUser.name },
      process.env.JWT_PRIVATE_KEY
    );
    const decode = jwt.decode(token);
    console.log(decode);

    res.status(200);
    return res.send(token);
  } else if (!user) {
    res.status(401);
    res.send({ error: "Wrong password" });
  } else {
    res.status(401);
    res.send({ error: "Wrong password" });
  }
});

module.exports = router;
