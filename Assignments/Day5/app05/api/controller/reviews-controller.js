const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const reviewsGetAll = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, response){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(response.reviews);
        }        
    });
}

const reviewsGetOne = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    if(!mongoose.isValidObjectId(req.params.reviewId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    
    Game.findById(gameId).select("reviews").exec(function(err, game){
        const review= game.reviews.id(reviewId);
        if(err){
            res.status(500).json(error);
        }
        else{
            if(!game){
                res.status(404).json({"message":"review Id not found "})
            }
            else{
                res.status(200).json(review);
            }
        }
        
    });
}
module.exports ={
    reviewsGetAll:reviewsGetAll,
    reviewGetOne: reviewsGetOne,
  
}