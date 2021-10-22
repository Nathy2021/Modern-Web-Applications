const mongoose = require("mongoose");
const Games = mongoose.model("Game");

const addReview = function (req, res) {
  const gameId = req.params.gameId;

  console.log("gameId ", gameId);

  Games.findById(gameId).exec(function (err, game) {
    console.log("game.reviews.length 1", game.reviews.length);
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else if (!game) {
      console.log("Game Id not found");
      res.status(404).json({ message: "Game Id not found" });
    } else {
      if (game.reviews.length >= 1) {
        if (game.reviews[0] === "") {
          game.reviews = req.body;
          console.log("game.reviews", game.reviews[0]);
        } else {
          game.reviews.push(req.body);
          console.log("game.reviews.length", game.reviews.length);
        }
      }

      // game.reviews.push(req.body);
      game.save(function (err, result) {
        if (err) {
          console.log("error saving review");
          res.status(500).json(err);
        } else {
          console.log("game saved");
          res.status(201).json(game);
        }
      });
    }
  });
};

const deleteReview = function (req, res) {
  console.log("delete review request");

  const gameId = req.params.gameId;

  console.log("gameId ", gameId);

  Games.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else if (!game) {
      console.log("Game Id not found");
      res.status(404).json({ message: "Game Id not found" });
    } else {
      if (game.reviews <= 1) {
        if (game.reviews === "") {
          res.status(404).json({ message: "Review not found" });
        } else {
          game.reviews = [];
          console.log("Message 1 reveiw removed ");
          res.status(404).json({ "message 1": "review removed" });
        }
      } else {
        let index = -1;
        for (let i = 0; i < game.reviews.length; i++) {
          if (game.reviews[i].id === req.params.reviewId) {
            console.log("Id found");
            index = i;
          }
        }

        game.reviews.splice(index, 1);
        console.log("Message 2 reveiw removed ");

        game.save(function (err, result) {
          if (err) {
            console.log("error saving review");
            res.status(500).json(err);
          } else {
            // console.log("game saved ", game);
            res.status(204).json(result);
          }
        });
      }
    }
  });
};

const getAllReviews = function (req, res) {
  console.log("Get all reviews request ");
  const gameId = req.params.gameId;

  console.log("gameId ", gameId);

  Games.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else if (!game) {
      console.log("Game Id not found");
      res.status(404).json({ message: "Game Id not found" });
    } else {
      console.log("Games found");
      res.status(200).json(game.reviews);
    }
  });
};

const getReview = function (req, res) {
  const gameId = req.params.gameId;

  console.log("gameId ", gameId);

  Games.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else if (!game) {
      console.log("Game Id not found");
      res.status(404).json({ message: "Game Id not found" });
    } else {
      if (game.reviews === "") {
        res.status(404).json({ message: "Review not found" });
      } else {
        const review = game.reviews.id(req.params.reviewId);
        res.status(200).json(review);
      }
    }
  });
};

const updateReview = function (req, res) {
  const gameId = req.params.gameId;

  console.log("gameId ", gameId);

  Games.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else if (!game) {
      console.log("Game Id not found");
      res.status(404).json({ message: "Game Id not found" });
    } else {
      if (game.reviews <= 1) {
        if (game.reviews === "") {
          res.status(404).json({ message: "Review not found" });
        } else {
          game.reviews[0].name = req.body.name;
          game.reviews[0].date = req.body.date;
          game.reviews[0].review = req.body.review;
          console.log("review updated2");

          res.status(200).json({ message: "review updated" });
        }
      } else {
        let index = -1;
        for (let i = 0; i < game.reviews.length; i++) {
          if (game.reviews[i].id === req.params.reviewId) {
            console.log("Id found");
            index = i;
          }

          game.reviews[i].name = req.body.name;
          game.reviews[i].date = req.body.date;
          game.reviews[i].review = req.body.review;
          console.log("review updated2");
        }

        game.save(function (err, result) {
          if (err) {
            console.log("error saving review");
            res.status(500).json(err);
          } else {
            console.log("game saved");
            res.status(201).json(result);
          }
        });
      }
    }
  });
};

module.exports = {
  addReview: addReview,
  getReview: getReview,
  getAllReviews: getAllReviews,
  deleteReview: deleteReview,
  updateReview: updateReview,
};
