const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");

router.post("/", articleController.postArticle);
router.get("/article", articleController.geArticle);

module.exports = router;
