const mongoose = require("mongoose");
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

function articleValidation(article) {
  const schema = z
    .object({
      title: z.String().min(3).max(255),
      constent: z.String().min(100),
      owner: z.number(),
      date: z.Date(),
    })
    .required({
      title: true,
      content: true,
      owner: true,
      date: true,
    });
}

module.exports = { ArticleModel, articleValidation };
