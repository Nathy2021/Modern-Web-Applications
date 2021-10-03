 
const mongoose = require("mongoose");
 
//Nested Docs, review is sub document 
const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    }, 
    name: {
        type: String,         
        required: false
    },
    creditHour:{
        type: Number,
        required: false
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
 


