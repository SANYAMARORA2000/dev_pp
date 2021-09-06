const { root } = require('cheerio');
const express=require('express');
const app=express();//through this line our server is created



app.listen(3000);//listening for requests


app.get("/",(request,response)=>{
  
   
  response.send("welcome to home page" );
})

app.get("/about",(request,response)=>{
  
  
    response.send("welcome to about page" );
  })
  
