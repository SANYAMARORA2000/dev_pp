
const express=require('express');
const app=express();//through this line our server is created



app.listen(3000);//listening for requests

//till now we were just sending files to the browsser but sometimes we need to send dynamic data and to do that we use view engine and one such is ejs
///register view engine

app.set('view engine','ejs');


app.get("/",(request,response)=>{
    
  const blogs=[{title:'yoshi finds egg',snippet:'lorem ipsum'},{title:'Mario finds stars',snippet:'lorem ipsum'},{title:'How to defeat stars',snippet:'lorem ipsum'}];

   
  response.render('index',{title:'home',blogs});
})
app.get("/about",(request,response)=>{
  
   
  response.render('about',{title:'about'});
})
app.get("/blogs/create",(request,response)=>{
  
   
  response.render('create',{title:'create'});
})

// app.get("/about",(request,response)=>{
  
  
//     // response.sendFile("./viewss/about.html" ,{root:__dirname});
//   })
  
