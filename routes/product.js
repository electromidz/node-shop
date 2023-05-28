const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send([{ name: "product 1" }, { name: "product 2" }]);
});

router.get("/:id", (req, res) => {
  res.send([{ name: `product ${req.params.id}` }]);
});

module.exports = router;
