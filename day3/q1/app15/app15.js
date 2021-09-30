const { clear } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api/routes");

app.set("port", 3000);


app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use("/mean", express.static(path.join(__dirname, "public")));

app.use("/games", routes);

const server =app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("Listening to port " +port);
});