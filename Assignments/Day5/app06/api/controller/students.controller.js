const mongoose = require("mongoose");
const Student = mongoose.model("Student"); 

const ObjectId = require("mongodb").ObjectId;


getAll = function(req, res){

    console.log("Json Request Received!");

    let offset = 0;
    let count = 3; //default
    
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

getOne=function(req, res){
     
    if(!mongoose.isValidObjectId(req.params.studentId)){
        
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

addOne= function(req, res){   
        
    if(!(req.body && req.body.name && req.body.GPA)){
    
        console.log("Data missing from Post body");
        res.status(400).json({error:"Required data missing from POST"});  
        return; 

    }
    else
    {      
        const newGame = {
            name: req.body.name,
            GPA: req.body.GPA
           
        };

       Student.create(newGame, function(err, response){
            if(err){
                console.log("Not creating a new game");
                res.status(500).json(err);
                return;
            }
            else{
                console.log("new game created!");
                res.status(201).json(response);
            }
        });
    }
};

updateStudent = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid student id passed."});
        return;
    }
    const studentId = req.params.studentId;
    Student.findById(studentId).select("-courses").exec(function(err, student){
        if(err){
            console.log();
            res.status(500).json(err)
        }
        else{
            if(!student){
               
                res.status(404).json({"message":"Student Id is not found"});
                return;
            }
            else{
                student.name = req.body.name;
                student.GPA = req.body.GPA;
                
                student.save(function(err, updateStudent){
                    if(err){
                       
                       res.status(500).json(err);
                       return;
                    }
                    else{
                      
                        res.status(200).json(updateStudent);
                    }
                });

            }
        }
    });
};


deleteOne = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const studentId = req.params.studentId;
    Student.findByIdAndRemove(studentId).select("-courses").exec(function(err, deletedStudent){
        if(err){
            res.status(500).json(err)
        }
        else{
            if(!deletedStudent){
                res.status(404).json({"message":"Student Id is not found"});
                return;
            }
            else{
                
                res.status(204).json(deletedStudent);
             }
                

        }
    });
};

module.exports ={
    studentsGetAll:getAll,
    studentsGetOne:getOne, 
    studentsAdd:addOne, 
    updateStudentData: updateStudent,
    deletedStudent:deleteOne
}
