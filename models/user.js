const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxLength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxLength: 320,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    index: { unique: true, dropDups: true },
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11,
    required: true,
    match: /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    minlength: 6,
    maxLength: 60,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (password, cb) {
  return await bcrypt.compare(password, this.password);
};

function userValidation(user) {
  console.log(user);
  const schema = z
    .object({
      name: z.string().min(3).max(100),
      email: z
        .string()
        .min(3)
        .max(320)
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      phone: z
        .string()
        .min(11)
        .max(11)
        .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
      password: z.string().min(6).max(60),
    })
    .required({
      name: true,
      email: true,
      phone: true,
      password: true,
    });

  userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await hashPassword(user.password);
    next();
  });
  return schema.parse(user);
}

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel, userValidation, hashPassword };
