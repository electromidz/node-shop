//const { ArticleModel, articleValidation } = require("../models/article");
module.exports = {
  postArticle: async function (req, res) {
    const validation = articleValidation(req.body);
    const articleSchema = new ArticleModel(req.body);
    try {
      await articleSchema.save();
      res
        .status(201)
        .send({ hasError: false, result: [{ articleSchema: articleSchema }] }); lmk
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },
  getArticle: async function (req, res) {
    return new ArticleModel.find({}, function (err, res) {
      console.log(res);
    });
    res.status(201).send({ result: [] });
  },
  putArticle: async function (req, res) {
    return new ArticleModel.findOne({id:req.id}, function (err, res) {
      console.log(res)
    }
  }
};
