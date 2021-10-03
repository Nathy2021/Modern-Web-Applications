const mongoose = require("mongoose");

const badmintonFunSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
      
    }, 
    startYear:  {
       type: Number,
       required: true      
   },       
    playerName:{
        type: String,
       required: true 
    }
 
});
mongoose.model("BadmintonFun", badmintonFunSchema, "badmintonFuns");