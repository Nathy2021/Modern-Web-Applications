const mongoose = require("mongoose");
const Student = mongoose.model("Student"); 

const ObjectId = require("mongodb").ObjectId;


coursesGet = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.studentId)){
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
                console.log("game is not found!");
                res.status(404).json({"message":"Game Id not found"});
                return;
            }
            else{
                console.log("found game");
                res.status(200).json(student.courses);
            }

        }
        
    });  

}

courseGetOne = function(req, res){
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    Student.findById(studentId)
        .select("courses")
        .exec(function (err, student) {
        var course = student.courses.find((c) => c.id === courseId);   
    
        res.status(200).json(course);
    });
}



module.exports={
    getCourses: coursesGet,
    courseGetOne:courseGetOne

}