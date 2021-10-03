const express = require("express");
const controllerGames= require("../controller/games.controller");
const router = express.Router();
const controllerPublisher = require("../controller/publisher-controller");


router.route("/games")
        .get(controllerGames.gamesGetAll)
        .post(controllerGames.addOneGame);

router.route("/games/:gameId")
        .get(controllerGames.gamesGetOne)
        .put(controllerGames.updatedGame)
        .delete(controllerGames.deletedGame);
 
router.route("/games/:gameId/publisher")
        .get(controllerPublisher.getPublisher)
        .post(controllerPublisher.addedPublisher)
        .put(controllerPublisher.updatedPublisher)
        .delete(controllerPublisher.deletedPublisher);

module.exports = router;
