const mongoose = require("mongoose");
const { Schema } = mongoose;
const { z } = require("zod");

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

function articleValidation(article) {
  const schema = z
    .object({
      title: z.string().min(3).max(255),
      content: z.string().min(100),
      owner: z.number(),
      date: z.date(),
    })
    .required({
      title: true,
      content: true,
      owner: true,
      date: true,
    });

  return schema.parse(article);
}

module.exports = { ArticleModel, articleValidation };
