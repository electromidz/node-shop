const { ArticleModel, articleValidation } = require("../models/article");
module.exports = {
  postArticle: async function (req, res) {
    console.log("POST Article", req.body);
    const validation = articleValidation(req.body);
    // const articleSchema = ArticleModel(req.body);
    res.status(201).send({ message: "test" });
  },
  getArticle: async function (req, res) {
    // console.log("GET Article");
    // res.status(201).send({ result: [] });
  },
};
