const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");

// router.post("/article", articleController.postArticle);
router.get("/article", (req, res) => {
  console.log("here");
});

module.exports = router;
