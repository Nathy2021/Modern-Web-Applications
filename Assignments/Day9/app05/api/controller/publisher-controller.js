const mongoose = require("mongoose");
const Game = mongoose.model("Game"); //"Game"

const ObjectId = require("mongodb").ObjectId;


publisherGet = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }

    const gameId = req.params.gameId;
    
    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            console.log("error finding game");
            res.status(500).json(err);
            return;
        }
        else{
            if(!game){
                console.log("game is not found!");
                res.status(404).json({"message":"Game Id not found" +gameId});
                return;
            }
            else{
                console.log("found game");
                res.status(200).json(game.publisher);
            }

        }
        
    });  

}

const _addPublisher=function(req, res, game){
   game.publisher.name = req.body.name;
   game.publisher.country= req.body.country;
    
   game.save(function(err, updatedGame){
      
        if(err){
 
            res.status(500).json(err);
        }
        else{
            
            res.status(201).json(updatedGame.publisher);

        }
        
   });
};

publisherAdd = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            console.log("error finding game");
            res.status(500).json(err);
            return;
        }
        else{
            if(!game){
                console.log("game is not found!");
                res.status(404).json({"message":"Game Id not found, " +gameId});
                return;
            }
            else{
                _addPublisher(req, res, game);
            }

        }
        
    });   


};

const _updatePublisher = function(req, res, game)
{
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
        
    game.save(function(err, updateGame){
        if(err){
            console.log("error finding game");
            res.status(500).json(err);
        }
        else{
            res.status(200).json(updateGame.publisher);
        }
    });
};

publisherUpdate = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.gameId)){
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            console.log("game by this id is not found");
            res.status(500).json(err);
        }
        else{
            if(!game){
                console.log("Not found");
                res.status(404).json({"message":"Game ID not found"});
            }
            else{                
                _updatePublisher(req, res, game);
            }
        }
    });

};

const _deletePublisher = function(req, res, game){
    game.publisher.remove();
    game.save(function(err, game){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).json({"message":"publisher deleted"});
        }
    });    
};
publisherDelete = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews").exec(function(err, game){
       if(err){
        res.status(500).json(err);
       }
       else{
           if(!game){
                res.status(404).json({"message":"Game Id not found"})
           }
           else{
                _deletePublisher(req, res, game);
           }
       }
    });
};

module.exports={
    getPublisher: publisherGet,
    addedPublisher: publisherAdd,
    updatedPublisher:publisherUpdate,
    deletedPublisher: publisherDelete

}