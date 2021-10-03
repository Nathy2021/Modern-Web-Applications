const mongoose = require("mongoose");
require("./badmintonFun-model.js");
const dbUrl = "mongodb://localhost:27017/PhPDB";
mongoose.connect(dbUrl);


//connect
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " +dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnedted");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error ", err);
});

// disconnecte, signal interrupt/mac
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

// terminate/window
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

//restart/ubuntu
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.kill(process.pid, "SIGUSER2");
    });
});