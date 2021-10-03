const express = require("express");
const path = require("path");
require("./api/data/db");
const routes= require("./api/routes");

const app = express();

// const bodyParse = require("body-parse");

app.set("port", 3000);

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended:false}));

app.use("/api", routes);

// app.get("/", function (req, res) {
//     console.log("Get Received");
//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
// });


const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("Listening to port " + port);
});
