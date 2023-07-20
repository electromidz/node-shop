const { ArticleModel } = require("../models/article");
module.exports = {
  postArticle: async function (req, res) {
    console.log("POST Article");
    const validationsArticle = await ArticleModel.req.body;
    res.status(201).send({ message: "test" });
  },
  getArticle: async function (req, res) {
    console.log("GET Article");
    res.status(201).send({ message: "test" });
  },
};
