const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");

// router.post("/article", articleController.postArticle);
router.get("/article", articleController.getArticle);

module.exports = router;
