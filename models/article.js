const mongoose = require("mongoose");
import {UserSchema} from './user';

const userSchema = new UserSchema();
const articleSchema = new mongoose,Schema({
    title: {
        type:String
        required: true
    },
    content :{
        type:String
    }
     owner: userSchema
})

const ArticleSchema = mongoose.model("Article", articleSchema);
 module.exports = {ArticleSchema}