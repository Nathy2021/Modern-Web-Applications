const express = require("express");
const router = express.Router();
const controllerGames = require("../controller/games.controller");
router.route("/json").get(controllerGames.gamesGetAll);

 
module.exports=router;
