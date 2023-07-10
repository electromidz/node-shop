const mongoose = require("mongoose");

const articleSchema = new mongoose,Schema({
    title: {
        type:String
        required: true
    },
    content :{
        type:String
    }
})

const ArticleSchema = mongoose.model("Article", articleSchema);
 module.exports = {ArticleSchema}