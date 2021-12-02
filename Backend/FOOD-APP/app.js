

const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    console.log("request has been made");
    console.log(req.method);
    console.log(req.url);
    res.setHeader('Content-Type','text/html');
    let path='./views/';
    switch(req.url)
    {
      case '/':
        path+='index.html';
        res.statusCode=200;
        break;
        

      case '/about':
        path+='about.html';
        res.statusCode=200;
        break;
        
    
     default:
        path+='404.html'
        res.statusCode=404;
        break;
        
    }

    fs.readFile(path,(err,filedata)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.write(filedata);
            res.end();
        }
    })
})

server.listen(3000,'localhost',()=>{
    console.log("server is listening");
})
