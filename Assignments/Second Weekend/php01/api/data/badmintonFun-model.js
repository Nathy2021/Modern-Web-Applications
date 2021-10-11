const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }, 
    teamCountry: {
        type: String,
        required: false
    },
    playedYears:{
        type: Number,
        required:false
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
    teams:[teamSchema]
 
});
mongoose.model("BadmintonFun", badmintonFunSchema, "badmintonFuns");