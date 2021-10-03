const express = require("express");
const controllerGames= require("../controller/games.controller");
const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.addOneGame);

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.updatedGame)
    .delete(controllerGames.deletedGame);


module.exports = router;
