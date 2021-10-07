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


const _addReview = function(req, res, game){

    if(!(req.body && req.body.name && req.body.review)){
    
        console.log("Data missing from Post body");
        res.status(400).json({error:"Required data missing from POST"});  
        return; 

    }
  

    const newReview ={
        name: req.body.name,
        review: req.body.review,
        date: req.body.date

    }; 

   
     if(game.reviews.length < 1){
        game.reviews = newReview; 
     }
      else{
        game.reviews.push(newReview); 
      }    

    game.save(function(err, response){

        if(err){
                console.log("Not creating a new review");
                res.status(500).json(err);
                return;
        }
        else{
        console.log("new review created!");
        res.status(201).json(response.reviews);
        }
    });
    
};

const addReview= function(req, res){    
    if(!mongoose.isValidObjectId(req.params.gameId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid game id passed."});
        return;
    }
    const gameId = req.params.gameId;
 
    Game.findById(gameId).select("reviews").exec(function(err, game){
         
        if(err){
             console.log("error finding game");
             res.status(500).json(err);
             return;
         }
         else{
             if(!game){
                 console.log("game is not found!");
                 res.status(404).json({"message":"Game Id not found"});
                 return;
             }
             else{
                  if(!((game.reviews) || (game.reviews===''))){
                    game.reviews= {name:"empty", review:"empty"}
                }
                 _addReview(req, res, game);
             }
 
         }
         
     });  
};

const _updateReview = function(req, res, game)
{
    
    const reviewId = req.params.reviewId;   
    let len = game.reviews.length
    let index = -1;
    for (let i = 0; i < len; i++) {
        if (game.reviews[i].id === reviewId) {
            index = i
            break;
        }
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = game.reviews.length
    }
    game.reviews[insertIdx] = { 
        name: req.body.name, review: req.body.review, date: req.body.date 
    }
    
  
               
    game.save(function(err, game){
        if(err)
        {
            console.log("error finding game");
             res.status(500).json(err);
        }
        else
            {
                if(!game)
                {
                    res.status(404).json({"message":"No game Id"});
                }
                else
                {
                    res.status(201).json(game.reviews[index]);
                }
            }
    });
   
};

const reviewUpdate = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const gameId = req.params.gameId;

   Game.findById(gameId).select("reviews").exec(function(err, game){
         
        if(err){
            console.log("Game by this id is not found");
            res.status(500).json(err);
        }
        else{
            if(!game){
                console.log("Not found");
                res.status(404).json({"message":"game ID not found"});
            }
            else{ 
           
                _updateReview(req, res, game);
            }
        }
    });

};

const _deleteReview = function(req, res, game){

    const reviewId = req.params.reviewId;   
    let len = game.reviews.length
    let index = -1;

    for (let i = 0; i < len; i++) {
        if (game.reviews[i].id === reviewId) {
            index = i
            break;
        }
    }

    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = game.reviews.length
    }    

    game.reviews.splice(index,1);

    game.save(function(err, game){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).json(game.reviews[insertIdx]);
        }
    });  
}; 

const reviewDelete = function(req, res){
    if(!mongoose.isValidObjectId(req.params.gameId)){
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const gameId = req.params.gameId;    

    Game.findById(gameId).exec(function(err, game){
       if(err){
        res.status(500).json(err);
       }
       else{
           if(!game){
                res.status(404).json({"message":"Fun Id not found"})
           }
           else{
                _deleteReview(req, res, game);
           }
       }
    });
};


module.exports ={
    reviewsGetAll:reviewsGetAll,
    reviewGetOne: reviewsGetOne,
    addReview: addReview,
    updateReview: reviewUpdate,
    deleteReview:reviewDelete

}