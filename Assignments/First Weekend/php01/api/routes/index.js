const express = require("express");
const badmintonFunsController = require("../controller/bandmintoFuns-controller");
const teamController = require("../controller/team-controller");
const router = express.Router();

router.route("/badmintonfuns")
    .get(badmintonFunsController.funsGetAll)
    .post(badmintonFunsController.funAdd);
router.route("/badmintonfuns/:funId")
    .get(badmintonFunsController.funsGetOne)
    .put(badmintonFunsController.updateFun)    
    .delete(badmintonFunsController.deletedFun);
router.route("/badmintonfuns/:funId/team")
        .get(teamController.getTeam)        
        .put(teamController.updateTeam)
        .delete(teamController.deletedTeam);

module.exports = router;