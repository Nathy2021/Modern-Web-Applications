const MongoClient = require("mongodb").MongoClient;
const dbName = "meanGames";
const dburl = "mongodb://localhost:27017//"+dbName;
let _connection = null;

const open = function(){
    MongoClient.connect(dburl, function(err, client){
        if(err){
            console.log("DB Connection Failed");
            return;
        }
        
        _connection=client.db(dbName);
        console.log("DB connection open");
    });
};
const get = function(){
    return _connection;
};
module.exports={
    opened: open,
    get: get
};