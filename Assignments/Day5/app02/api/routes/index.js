const express = require("express");
const controllerStudents= require("../controller/students.controller");
const controllerCourses = require("../controller/courses-controller");
const router = express.Router();

router.route("/students").get(controllerStudents.studentsGetAll);
router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
router.route("/students/:studentId/courses").get(controllerCourses.getCourses);
router.route("/students/:studentId/courses/:courseId").get(controllerCourses.courseGetOne);

module.exports = router;
