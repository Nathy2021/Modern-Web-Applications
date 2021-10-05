const express = require("express");
const controllerStudents= require("../controller/students.controller");
const controllerCourses = require("../controller/courses-controller");
const router = express.Router();

router.route("/students")
        .get(controllerStudents.studentsGetAll)
        .post(controllerStudents.studentsAdd);
    
router.route("/students/:studentId")
        .get(controllerStudents.studentsGetOne)
        .put(controllerStudents.updateStudentData)
        .delete(controllerStudents.deletedStudent);

router.route("/students/:studentId/courses")
        .get(controllerCourses.getCourses)
        .post(controllerCourses.addCourse);
         
router.route("/students/:studentId/courses/:courseId")
        .get(controllerCourses.courseGetOne)
        .put(controllerCourses.updateCourse)
        .delete(controllerCourses.courseDelete);
        

module.exports = router;
