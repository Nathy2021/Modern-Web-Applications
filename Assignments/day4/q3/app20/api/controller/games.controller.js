const dbConnection= require("../data/dbconnection");

const getSome = function(req, res){
    console.log("Json Request Received!");
    let db = dbConnection.get();
    let gameCollection = db.collection("games");

    let offset = 0;
    let count = 6;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
    }

    if(count < 10)   
    {
        gameCollection.find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs){
        // console.log("Found Games", docs);
        res.status(200).json(docs); 
        });
    }
    else{
        res.status(500).json({"JSONData":false}); 
    }
 
}

module.exports ={
    gamesGetSome:getSome    
}
