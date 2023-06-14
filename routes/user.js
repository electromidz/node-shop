require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { UserModel, userValidation, hashPassword } = require("../models/user");

// router.post("/register", async (req, res) => {
//   const validation = userValidation(req.body);
//   console.log("ZOD ERROR ::\n", validation);
//   if (validation.error) {
//     return res.status(404).send(validation.error.details[0].message);
//   }
//   req.body.password = await hashPassword(req.body.password);
//   console.log(req.body);
//   const newUser = new UserModel(req.body);
//   try {
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (err) {
//     res.status(500).send({ error: "Somtthings went wrong" });
//   }
// });

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
