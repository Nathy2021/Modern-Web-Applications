const express = require("express");
const router = express.Router();
const controller = require("../../controller/games.controller");
const publisherController = require("../../controller/publisher.controller");
const reviewsController = require("../../controller/review.controller")
const userController = require("../../controller/users.controller")

router.route("/games")
        .get(controller.getAllGames)
        .post(controller.addGame)       


router.route("/games/:gameId")
        .get(controller.getOneGame)
        .delete(controller.deleteGame)
        .put(controller.updateGame);

router.route("/games/:gameId/publisher")
        .get(publisherController.publisherGetAll)
        .delete(publisherController.deletePublisher)
        .put(publisherController.publisherUpdate)
        .post(publisherController.publisherAdd)

router.route("/games/:gameId/reviews")
.post(reviewsController.addReview)
.get(reviewsController.getAllReviews)

router.route("/games/:gameId/reviews/:reviewId")
.get(reviewsController.getReview)
.delete(reviewsController.deleteReview)
.put(reviewsController.updateReview)

router.route("/users/")
        .post(userController.register);
router.route("/users/login")
        .post(userController.login);



module.exports = router;
        