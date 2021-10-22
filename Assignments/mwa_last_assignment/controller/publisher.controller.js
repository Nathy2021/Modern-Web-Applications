const mongoose = require("mongoose");
const Games = mongoose.model("Game");

publisherGetAll = function (req, res) {
  console.log("Get request to all publishers of a game received!!");
  var gameId = req.params.gameId;
  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Invalid game Id");
    res.status(400).json({ message: "Invalid game id" });
    return;
  }

  Games.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      if (err) {
        console.log("error finding game");
        res.status(500).json(err);
      } else {
        if (!game) {
          console.log("game Id not found");
          res.status(404).json({ message: "game with given gameId not found" });
        } else {
          res.status(200).json(game.publisher);
        }
      }
    });
};
deletePublisher = function (req, res) {
  console.log("Delete request to signle publisher of a game recieved");

  var gameId = req.params.gameId;

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Invalid game Id");
    res.status(400).json({ message: "Invalid game id" });
    return;
  }

  if (!req.params.gameId) {
    console.log("Invalid gameId Id");
    res.status(400).json({ message: "Invalid game id" });
    return;
  }

  Games.findById(gameId).exec(function (err, game) {
    game.publisher.remove();
    game.save();
    res.status(200).json({ message: "game deleted" });
  });
};

var _updatePublisher = function (req, res, game) {

 
  game.publisher = {
                    name : req.body.name,
                    country : req.body.country 
                } 
 
  
  game.save(function (err, updateGame) {
    var response = { status: 204 };
    console.log("updage game", updateGame);
    if (err) {
      console.log("Error 2 finding game");
      response.status = 500;
      res.status(response.status).json(response.message);
    }
  });
};
publisherUpdate = function (req, res) {
  var gameId = req.params.gameId;
  console.log("PUT gameId ", gameId);

  Games.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      var response = { status: 204 };

      console.log("game ", game);

      if (err) {
        console.log("Error finding game");
        res.status(500).json({"message" : "internal error"});
        return;
      } else if (!game) {
        res.status(404).json({"message" :  "game not found"});
      }     
      else {
        _updatePublisher(req, res, game);
      }
    });
};


var _addPublisher= function(req, res, game) {
    game.publisher = {
        name : req.body.name,
        country : req.body.country 
    } 
    
    game.save(function(err, updatedGame){
    var response= {status: 200, message: []}; 
    if (err) {
    response.status= 500;
    response.message= err;
     } 
    else {
    response.status= 201;
    response.message= updatedGame.publisher;
 }
    res.status(response.status).json(response.message);
 
    })
};
publisherAdd= function(req, res) {
    var gameId= req.params.gameId;
    console.log("Get gameId ", gameId);
    
    Games.findById(gameId).select("publisher").exec(function(err, game) {
    var response= {status: 200, message: []};
    
    if (err) {
    console.log("Error finding game");
    response.status= 500; response.message= err;
 } 
    
    else if (!game) {
    console.log("Game id not found in database", id);
    response.status= 404; 
    
    response.message= {"message": "Game ID not found"+gameId};

}
    if (game) {
    _addPublisher(req, res, game);
    } else {
    res.status(response.status).json(response.message); 
    }

    });
}
module.exports = {
  publisherGetAll: publisherGetAll,
  deletePublisher,
  deletePublisher,
  publisherUpdate: publisherUpdate,
  publisherAdd : publisherAdd
};
