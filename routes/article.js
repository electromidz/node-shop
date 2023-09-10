const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");

// router.post("/", articleController.postArticle);
router.get("/", articleController.geArticle);
router.put("/", articleController.putArticle);
router.delete("/", articleController.deleteArticle);

module.exports = router;
