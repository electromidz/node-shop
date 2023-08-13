const mongoose = require("mongoose");
const { Schema } = mongoose;
const { z } = require("zod");

const articleSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref:'product'
  }
  data: {
    type: String,
  },
});

function articleValidation(article) {
  const schema = z
    .object({
      title: z.string().min(3).max(255),
      content: z.string().min(100),
      owner: z.string(),
      date: z.number(),
    })
    .required({
      title: true,
      content: true,
      owner: true,
      date: true,
    });

  return schema.parse(article);
}

var ArticleModel = mongoose.model("Article", articleSchema);

module.exports = { ArticleModel, articleValidation };
