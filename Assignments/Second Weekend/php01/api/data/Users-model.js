const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    password: {
        type: String, required: true
    },
    name : String,
    username: {
        type: String,
        unique : true,
        required : true
    }
   
})


mongoose.model("User", userSchema, "users")