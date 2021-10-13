let http = require('http');
let fs = require('fs');
var url = require('url');  

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname; 
    res.writeHead(200, {'Content-Type': 'text/html'});  
   
    console.log(path); 
  
    switch(path)
    {
     
        case '/index.html': 
            var q = url.parse(req.url, true).query;
            console.log(q);
            var pageNumber = q.page;
            console.log("page number ",pageNumber)

            if(pageNumber == 1){
                fs.readFile('./public/page1.html', null, function (error, data) {
                    if (error) {
                        console.log("5");
                        res.writeHead(404);
                        res.write(' File not found!');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });              

            }           
            
            else if(pageNumber ==2){
                fs.readFile('./public/page2.html', null, function (error, data) {
                    if (error) {
                     console.log("7");
                        res.writeHead(404);
                        res.write('Whoops! File not found!');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });

            }  
            
            else if(pageNumber ==3){
                fs.readFile('./public/page3.html', null, function (error, data) {
                    if (error) {
                     console.log("7");
                        res.writeHead(404);
                        res.write('Whoops! File not found!');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });

            }
            
        
            else {
                fs.readFile('/public/index', null, function (error, data) {
                    if (error) {
                        console.log("4");
                        res.writeHead(404);
                        res.write('File not found!');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });

            }           
           break;

        case '/page1.html': 
             fs.readFile('./public/page1.html', null, function (error, data) {
                    if (error) {
                        console.log("5");
                        res.writeHead(404);
                        res.write(' File not found!');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });
                break;
            case '/page2.html': 
                fs.readFile('./public/page2.html', null, function (error, data) {
                       if (error) {
                        console.log("6");
                           res.writeHead(404);
                           res.write('File not found!');
                       } else {
                           res.write(data);
                       }
                       res.end();
                   });
                   break;

                case '/page3.html': 
                     fs.readFile('./public/page3.html', null, function (error, data) {
                       if (error) {
                        console.log("7");
                           res.writeHead(404);
                           res.write('Whoops! File not found!');
                       } else {
                           res.write(data);
                       }
                       res.end();
                   });
                   break;
                  
                 default:  
                       res.writeHead(404);  
                       res.write("opps check your url - 404");  
                       res.end();  
                       break; 
    }
}).listen(4444);


