const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/siteUserAdmin");

mongoose.connection.on("error", (error) => {
  console.error(`Error connecting: ${error}`);
});

mongoose.connection.on("open", () => {
  console.log("Establishing connection ...");
});

const ProductModel = require("./models/product");
const newProduct = new ProductModel({ name: "new product" });
async function saveProduct() {
  await newProduct.save();
}
saveProduct();
console.log("Product saved", newProduct);

app.listen(port, () => {
  console.log("App listening on port " + port);
});

// 178.22.122.100, 185.51.200.2
