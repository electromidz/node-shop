const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
