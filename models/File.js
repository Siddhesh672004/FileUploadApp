//import mongoose
const mongoose = require("mongoose");

//route handler
const fileSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        imageUrl:{
            type:String,
        },
        tags:{
            type:String,
        },
        email:{
            type:String,
        }
});




//export
module.exports = mongoose.model("user", fileSchema);