const express = require("express");
const userController = require("../controller/user-controller");
const badmintonFunsController = require("../controller/bandmintoFuns-controller");
const teamController = require("../controller/teams-controller");
const router = express.Router();


router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login)

router.route("/badmintonfuns")
        .get(badmintonFunsController.funsGetAll)
        .post(badmintonFunsController.funAdd);
router.route("/badmintonfuns/:funId")
        .get(badmintonFunsController.funsGetOne)
        .put(badmintonFunsController.updateFun)    
        .delete(badmintonFunsController.deletedFun);
router.route("/badmintonfuns/:funId/teams")
        .get(teamController.getAllTeams)  
        .post(teamController.teamAdded)  
        
router.route("/badmintonfuns/:funId/teams/:teamId")
        .get(teamController.getOneTeam)             
        .put(teamController.updateTeam)
        .delete(teamController.deletedTeam);

module.exports = router;