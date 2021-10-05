// setting connection, mongoose driver
require("dotenv").config({"path":".env"});
const mongoose = require("mongoose");
// compile model, let know about the model
require("./school-model.js");
const dbName = process.env.DATABASE_NAME;
const dbUrl = process.env.DATABASE_URL;

// mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.connect(dbUrl+dbName);


//connect
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " +dbName);
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


