const express = require("express");
const app = express();
require("./data/db");
const path = require("path");
const routes = require("./api/route");

app.use(express.urlencoded());
app.use(express.json({ extended: false }));
app.use("/node_modules",express.static(path.join(__dirname, "node_modules")))
app.use(function(req, res, next){
  console.log(req.method, req.url)
  next()
})

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Methods","*")

  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);

app.set("port", "3000");
const server = app.listen(app.get("port"), function () {
  console.log("Listening on port ", app.get("port"));
});
