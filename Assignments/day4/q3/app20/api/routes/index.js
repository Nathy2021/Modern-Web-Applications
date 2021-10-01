const express = require("express");
const controllerGames= require("../controller/games.controller");
const router = express.Router();

router.route("/games").get(controllerGames.gamesGetSome);

module.exports = router;
