const express = require("express");
const controllerJob= require("../controllers/jobs-controller");
const router = express.Router();



router.route("/jobs")
        .post(controllerJob.addOneJob)
        .get(controllerJob.getAllJobs);
      

router.route("/jobs/:jobId")
        .get(controllerJob.getOneJob)
        .delete(controllerJob.deleteOne);
//         .put(controllerJobs.updatedJob)
//         

 


module.exports = router;
