let http = require('http');
let fs = require('fs');
var url = require('url');  

http.createServer(function(request, response)
{
    var path = url.parse(request.url).pathname;  
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    fs.readFile('./public/page1.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}).listen(4444);