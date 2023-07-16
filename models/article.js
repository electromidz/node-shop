const mongoose = require("mongoose");
import { UserModel } from "./user";
const { Schema } = mongoose;

const ArticleModel = mongoose.model(
  "article",
  new Schema({
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  })
);

module.exports = { ArticleModel };
