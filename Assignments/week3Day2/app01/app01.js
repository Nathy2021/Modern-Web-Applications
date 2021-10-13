// var http = require("http")
// const server = http.createServer(function(req, res){
//     req.write(req.random);
//     res.end();
// });
// server.on('request', (req, res) => {
//   res.writeHead(...);
//   res.end(...server response);
// });
// server.listen(port, someURL);

// var http = require('http');
// var url = require('url');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.end(txt);
// }).listen(8080);

// var http = require('http');
// http.createServer(function(req, res){
//     console.log("req.method: ", req.method, req.url);
//     // res. 
//     // req.random();
//     res.end();   

// }).listen(4444);

var http = require('http');
const { type } = require('os');
var url = require('url');
var fs = require('fs');
http.createServer(function(req, res){
    console.log("req.method: ", req.method, req.url);
    res.writeHead(200, {"content-type":"text/html"});
    res.send("./public/page1.html");
    res.end("hello world\n");   

}).listen(4444);
