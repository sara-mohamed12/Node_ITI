const http = require('http');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
switch(req.url){
    case "/":
    case "/home":
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let homepage=fs.readFileSync("./pages/home.html")
        res.end(homepage);
        break;

    case "/home/nature":
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let naturepage=fs.readFileSync("./pages/nature.html")
        res.end(naturepage);
        break;  

    case "/home/quote":
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          let quotepage=fs.readFileSync("./pages/quotes.html")
          res.end(quotepage);
          break;      

    case "/data":
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let todos=fs.readFileSync('./todos.json',{encoding:"utf-8"}); 
        res.end(todos);
        break;    
    default:
        if(req.url.includes(".jpg")){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'image/jpg');
          let image=fs.readFileSync('.'+req.url); 
          res.end(image);
        }else{
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end("<h1> page not found </h1>");
        }       
        break;
   }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});