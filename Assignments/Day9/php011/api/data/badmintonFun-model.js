const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    country: {
        type: String,
        required: true
    },
    playedYears:{
        type: Number,
        required:true
    },
     
});

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
    },
    team:[teamSchema]
 
});
mongoose.model("BadmintonFun", badmintonFunSchema, "badmintonFuns");