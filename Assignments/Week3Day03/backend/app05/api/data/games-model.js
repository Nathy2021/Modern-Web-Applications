const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    country: {
        type: Number,
        required: true
    },
    established:{
        type: Date,
        required:false
    },
    location:{
        type:{
           type: String
        },
         //Store coordinates in order logitude(E/W), latitude(N/S)
         coordinates:{
             type: [Number],
             index:"2dshere"
         }
    }
});

//Nested Docs, review is sub document 
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false
    },
    review:{
        type: String,
        required:true
    },  
    date:{
        type: Date,
        required: false
    }
});

const gameScheme = new mongoose.Schema({
    title: {
         type: String,
         required: true
        //  unique: true
     }, 
     price:{
        type:Number,
        required: true
       },
   minAge: {
       type:Number,
      // required: true
   },
   designers: [String],
   players:{
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    reviews:[reviewSchema],
    publisher: publisherSchema
 });
mongoose.model("Game", gameScheme, "games");



