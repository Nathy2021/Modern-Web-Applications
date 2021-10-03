 
const mongoose = require("mongoose");
 
//Nested Docs, review is sub document 
const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    }, 
    name: {
        type: String,         
        required: true
    },
    creditHour:{
        type: Number,
        required: true
    }
});

const StudentSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true
       
     }, 
     GPA:  {
        type: Number,
        required: true      
    },       
     courses:[courseSchema]
  
 });
 
// compiling the module, checks 
mongoose.model("Student", StudentSchema, "Students");
 


