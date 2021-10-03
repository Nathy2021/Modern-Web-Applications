const mongoose = require("mongoose");
const Game = mongoose.model("Game"); 

const ObjectId = require("mongodb").ObjectId;


const getAll = function(req, res){

    console.log("Json Request Received!");

    let offset = 0;
    let count = 4; //default
    let maximumCount = 6;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
       if(count > maximumCount){
           count = maximumCount;
       }
    }

    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"messagae": "QueryString offset and count should be numbers."});
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        if(err)
        {
                console.log("error finding games");
                res.status(500).json(err);
                return;
        }
        else{
             console.log("Found games");
             res.status(200).json(games);
        }
    });     
}

const getOne=function(req, res){
     
    if(!mongoose.isValidObjectId(req.params.gameId)){
        
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }

    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec(function(err, game){
        if(err){
            console.log("error finding game");
            res.status(500).json(err);
            return;
        }
        else{
            if(!game){
                console.log("game is not found!");
                res.status(404).json(game);
                return;
            }
            else{
                console.log("found game");
                res.status(200).json(game);
            }

        }        
    });  
};

module.exports ={
    gamesGetAll:getAll,
    gamesGetOne:getOne    
}
