const mongoose = require("mongoose");
const Games = mongoose.model("Game");

getAllGames = function (req, res) {
  console.log("Get all Games");

  let count = 6;
  let offset = 0;
  const maxCount = 10;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (isNaN(count)) {
    res.status(400).json({ message: "invalid input for count" });
  }

  if (isNaN(offset)) {
    res.status(400).json({ message: "invalid input for offset" });
  }

  if (count > maxCount) {
    res.status(400).json({ message: "value of count exceeded " + maxCount });
  }
  Games.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      if (err) {
        console.log("Error finding games");
      } else {
        console.log("Games found");
        res.status(200).json(games);
      }
    });
};

getOneGame = function (req, res) {
  const gameId = req.params.gameId;

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Invalid Game Id");
    res.status(400).json({ message: "Invalid Game id" });
    return;
  }

  Games.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("error finding game");
      res.status(500).json(err);
    } else {
      if (!game) {
        console.log("Game Id not found");
        res.status(404).json({ message: "Game with given gameId not found" });
      }
      console.log("Game Found");
      res.status(200).json(game);
    }
  });
};

addGame = function (req, res) {
  console.log("Post request received");
  console.log("rq.body ", req.body);

  const newGame = {
    title: req.body.title,
    price: req.body.price,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
  };

  Games.create(newGame, function (err, result) {
    if (err) {
      console.log("error creating game");
      res.status(500).json(err);
    } else {
      console.log("Game created");
      res.status(201).json(result);
    }
  });
};
deleteGame = function (req, res) {
  console.log("Delete request received");
  const gameId = req.params.gameId;

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("invalid game id");
    res.send(404).send({ message: "Game Id not found" });
  }

  Games.findByIdAndDelete(gameId).exec(function (err, game) {
    if (err) {
      console.log("error deleting the game");
      res.status(500).json(err);
    } else {
      console.log("Game deleted");
      res.status(201).json({ message: "game deleted" });
    }
  });
};

updateGame1 = function (req, res) {
  console.log("update request recieved");
  console.log("rq.body._id ", req.body._id);

  // res.status(201).json({"message": "Update request received"});

  const updateGameData = {
    title: req.body.title,
    price: req.body.price,
  };

  const returnUpdated = {
    new: true,
  };

  Games.findOneAndUpdate(
    { _id: "5fbed15c07a5894b456a4336" },
    updateGameData,
    returnUpdated,
    function (error, result) {
      if (error) {
        console.log("unable to update game");
      } else {
        console.log("game updated");
        console.log(result);
      }
    }
  );
};

updateGame = function (req, res) {
  console.log("update request recieved");
  console.log("req.params._id ", req.params.gameId);

  let oldGame = {};

  if (!mongoose.isValidObjectId(req.params.gameId)) {
    console.log("invalid game id");
    res.send(404).send({ message: "game Id not found" });
  }

  const id = req.params.gameId;
  Games.findById(id).exec(function (err, game) {
    if (err) {
      console.log("error finding Game");
      res.status(500).json(err);
    } else {
      if (!game) {
        console.log("Game Id not found");
        res.status(404).json({ message: "Game with given gameId not found" });
      }
      console.log("Game Found", game);
      oldGame = game;
    }
  });

  const gameId = { _id: req.params.gameId };

  const gameUpdate = {
    title: req.body.title || oldGame.title,
    price: parseInt(req.body.price) || oldGame.price,
    minPlayers: req.body.minPlayers || oldGame.minPlayers,
    maxPlayers: req.body.maxPlayers || oldGame.maxPlayers,
  };

  const returnUpdated = {
    new: true,
  };
  console.log("to be updated ", gameUpdate);

  Games.findOneAndUpdate(
    gameId,
    gameUpdate,
    returnUpdated,
    function (error, result) {
      if (error) {
        console.log("unable to update game");
      } else {
        console.log("game updated");
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
};

module.exports = {
  getAllGames: getAllGames,
  getOneGame: getOneGame,
  deleteGame: deleteGame,
  addGame: addGame,
  updateGame: updateGame,
};
