const mongoose = require("mongoose");
import { UserSchema } from "./user";
const { Schema } = mongoose;

const ArticleModel= mongoose.model("article", new Schema({
    title: {
        type:String
        required: true,
        minLength:3,
        maxLength:300,
    },
    content :{
        type:String
    }
     owner:{type:Schema.Types.ObjectId, ref:UserModel} 
})

module.exports = { ArticleModel};
