const mongoose = require("mongoose");
const Student = mongoose.model("Student"); 

const ObjectId = require("mongodb").ObjectId;


getAll = function(req, res){

    console.log("Json Request Received!");

    let offset = 0;
    let count = 2; //default
    
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
       
    }

    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"messagae": "QueryString offset and count should be numbers."});
        return;
    }

    Student.find().skip(offset).limit(count).exec(function(err, students){
        if(err)
        {
                console.log("error finding students");
                res.status(500).json(err);
                return;
        }
        else{
             console.log("Found students");
             res.status(200).json(students);
        }
    });     
}

const getOne=function(req, res){
     
    if(!mongoose.isValidObjectId(req.params.gameId)){
        
        res.status(400).json({"message":"invalid student id is passed."});
        return;
    }

    const studentId = req.params.studentId;
    
    Student.findById(studentId).exec(function(err, student){
        if(err){
            console.log("error finding student");
            res.status(500).json(err);
            return;
        }
        else{
            if(!student){
                console.log("game is not found!");
                res.status(404).json(student);
                return;
            }
            else{
                console.log("found game");
                res.status(200).json(student);
            }

        }        
    });  
};

module.exports ={
    studentsGetAll:getAll,
    studentsGetOne:getOne    
}
