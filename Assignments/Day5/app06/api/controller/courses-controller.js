const mongoose = require("mongoose");
const Student = mongoose.model("Student"); 

const ObjectId = require("mongodb").ObjectId;


const coursesGet = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid student id passed."});
        return;
    }

    const studentId = req.params.studentId;
    
   Student.findById(studentId).select("courses").exec(function(err, student){
        if(err){
            console.log("error finding student");
            res.status(500).json(err);
            return;
        }
        else{
            if(!student){
                
                res.status(404).json({"message":"student Id not found"});
                return;
            }
            else{
                
                res.status(200).json(student.courses);
            }

        }
        
    });  

}

const courseGetOne = function(req, res){
    // if(!mongoose.isValidObjectId(req.params.studentId)){
    //     console.log("Invalid id!");
    //     res.status(400).json({"message":"invalid student id passed."});
    //     return;
    // }
    // if(!mongoose.isValidObjectId(req.params.courseId)){
    //     console.log("Invalid id!");
    //     res.status(400).json({"message":"invalid student id passed."});
    //     return;
    // }
    const studentId = req.params.studentId;
    const courseId = parseInt(req.params.courseId);

    Student.findById(studentId)
        .select("courses")
        .exec(function (err, student) {
        var course = student.courses.find((c) => c.id === courseId); 
        
         
        let len = student.courses.length
        
        let index = -1;
        for (let i = 0; i < len; i++) {           
            if (student.courses[i].id === courseId) {
                index = i                
                break;
            }
        }
        
        var insertIdx;
        if (index != -1) {
            insertIdx = index
           
        } else {
            insertIdx = student.courses.length
        }
        
                 
        if(err) {
            res.status(500).json(err)
        }
        else{
            if(!student){
                res.status(404).json({"message":"student id is not found"})
            }
            else{
                res.status(200).json(student.courses[insertIdx]);
            }
        }
    });
}


const _addCourse=function(req, res, student){
    
    const newCourse ={
        id: req.body.id,
        name: req.body.name,
        creditHour: req.body.creditHour

    };
    if(student.courses.length < 1){
        student.courses = newCourse; 
     }
      else{
        student.courses.push(newCourse); 
      }    
    //const newTeam = req.body;
    //student.courses.push(newCourse);  

    student.save(function(err, updateStudent){
     
        if(err){
            console.log("error saving course");
            res.status(500).json(err);
        }
        else{
           
            res.status(201).json(updateStudent.courses);

        }      
   });
};

const courseAdd = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid student id passed."});
        return;
    }
    const studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err, student){
        if(err){
            console.log("error finding");
            res.status(500).json(err);
            return;
        }
        else{
            if(!student){
                console.log("student is not found!");
                res.status(404).json({"message":"student Id not found, " +funId});
                return;
            }
            else{
                if(!(student.courses)){
                    student.courses= {id:"empty", name:"empty", creditHour: {}}
                }
                _addCourse(req, res, student);
            }

        }
        
    });   
};

const _updateCourse = function(req, res, student)
{
    
    const courseId = parseInt(req.params.courseId);   
    let len = student.courses.length
    let index = -1;
    for (let i = 0; i < len; i++) {
        if (student.courses[i].id == courseId) {
            index = i
            break;
        }
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = student.courses.length
    }
    student.courses[insertIdx] = { 
        name: req.body.name, creditHour: req.body.creditHour
    } 
  
               
    student.save(function(err, student){
        if(err)
        {
            console.log("error finding student");
             res.status(500).json(err);
        }
        else
            {
                if(!student)
                {
                    res.status(404).json({"message":"No student Id"});
                }
                else
                {
                    res.status(201).json(student.courses[index]);
                }
            }
    });
   
};


const courseUpdate = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        res.status(400).json({"message":"invalid student id passed."});
        return;
    }
    const studentId = req.params.studentId;

   Student.findById(studentId).select("courses").exec(function(err, student){
         
        if(err){
           
            res.status(500).json(err);
        }
        else{
            if(!student){
             
                res.status(404).json({"message":"student ID not found"});
            }
            else{ 
           
                _updateCourse(req, res, student);
            }
        }
    });

};
const _deleteCourse = function(req, res, student){

    const courseId = parseInt(req.params.courseId);   
    let len = student.courses.length
    let index = -1;

    for (let i = 0; i < len; i++) {
        if (student.courses[i].id === courseId) {
            index = i
            break;
        }
    }

    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = student.courses.length
    }    

    student.courses.splice(index,1);

    student.save(function(err, student){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).json(student.courses[insertIdx]);
        }
    });  
}; 

const courseDelete = function(req, res){
    if(!mongoose.isValidObjectId(req.params.studentId)){
        res.status(400).json({"message":"invalid student id passed."});
        return;
    }
    const studentId = req.params.studentId;    
    Student.findById(studentId).exec(function(err, student){
       if(err){
        res.status(500).json(err);
       }
       else{
           if(!student){
                res.status(404).json({"message":"student Id not found"})
           }
           else{
                _deleteReview(req, res, student);
           }
       }
    });
};


module.exports={
    getCourses: coursesGet,
    courseGetOne:courseGetOne,
    addCourse:courseAdd,
    updateCourse:courseUpdate,
    courseDelete: courseDelete

}