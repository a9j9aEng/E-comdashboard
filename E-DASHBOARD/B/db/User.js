const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true,
    },
    email:{
        type:String,
        Required:true,
    },
    password:String
})

const User = new mongoose.model("User",UserSchema);
module.exports=User;