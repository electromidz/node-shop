const { UserModel, userValidation, hashPassword } = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function (req, res) {
    const validation = userValidation(req.body);
    if (validation.error) {
      return res.status(404).send(validation.error.details[0].message);
    }
    req.body.password = await hashPassword(req.body.password);
    console.log(req.body);
    const newUser = new UserModel(req.body);
    try {
      await newUser.save();
      res.status(201).send(newUser);
    } catch (err) {
      // TODO: must be handle error
      res.status(500).send({ error: "Somethings went wrong" });
    }
  },
  login: async function (req, res) {
    const userModel = new UserModel(req.body);
    const { email, phone, password } = req.body;

    const foundUser = await UserModel.findOne({
      $or: [{ email }, { phone }, { password }],
    });

    console.log(foundUser);
    if (foundUser === null) {
      return res.status(401).send({ error: "User not found!" });
    }

    // const user = await bcrypt.compareSync(password, foundUser.password);
    const user = await foundUser.comparePassword(password);

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
  },
};
