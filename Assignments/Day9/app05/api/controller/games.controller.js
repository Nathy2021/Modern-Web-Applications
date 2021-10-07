const mongoose = require("mongoose");
const Game = mongoose.model("Game"); //"Game"

const ObjectId = require("mongodb").ObjectId;

getAll = function(req, res){

    console.log("Json Request Received!");

    let offset = 0;
    let count = 6;
    const  maxCount = 9;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
        if(count > maxCount){
            count = maxCount;
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
        console.log("Invalid id!");
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
                res.status(404).json({"message":"Game id is not found"});
                return;
            }
            else{
                console.log("found game");
                res.status(200).json(game);
            }

        }
        
    });  
};

 
const addOne= function(req, res){    
    
    if(!(req.body && req.body.title && req.body.price && req.body.minAge)){
    
        console.log("Data missing from Post body");
        res.status(400).json({error:"Required data missing from POST"});  
        return; 

    }
    else
    {      

        const newGame = {
            title: req.body.title,
            price: req.body.price,
            minAge: req.body.minAge
        };

        Game.create(newGame, function(err, response){
            if(err){
                console.log("Not creating a new game");
                res.status(500).json(err);
                return;
            }
            else{
                console.log("new game created!");
                res.status(201).json(response);
            }
        });
    }
};


const updateGame = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game){
        if(err){
            console.log();
            res.status(500).json(err)
        }
        else{
            if(!game){
                res.status(404).json({"message":"Game Id is not found"});
                return;
            }
            else{
                game.titele = req.body.title;
                game.price = parseFloat(req.body.price);
                game.minAge = parseInt(req.body.minAge);
                game.save(function(err, updatedGame){
                    if(err){
                       res.status(500).json(err);
                       return;
                    }
                    else{
                        res.status(200).json(updatedGame);
                    }
                });

            }
        }
    });
};
 
const deleteOne = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }

    const gameId = req.params.gameId;
    Game.findByIdAndRemove(gameId).select("-reviews -publisher").exec(function(err, deletedGame){
        if(err){
            res.status(500).json(err)
        }
        else{
            if(!deletedGame){
                res.status(404).json({"message":"Game Id is not found"});
                return;
            }
            else{
                
                res.status(200).json(deletedGame);
             }
                

        }
    });
};


module.exports ={
    gamesGetAll:getAll,
    gamesGetOne:getOne,
    addOneGame:addOne,
    updatedGame:updateGame,
    deletedGame:deleteOne
}
