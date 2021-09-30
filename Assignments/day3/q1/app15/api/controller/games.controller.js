const gamesData = require("../data/games.json");
module.exports.gamesGetAll = function(req, res){
    console.log("Get all games");
    res.status(200).json(gamesData);
};