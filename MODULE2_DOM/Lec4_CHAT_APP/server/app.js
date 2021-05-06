//socketio -> used to implement socket

//nodemon-> consist of dev dependencies which are used ony on the time of development and not in production state in short jo chnages hote
//jayege app.js yeh apne aap dekh lega hume baar baar file run karne ki zaroorat nahi hai

//express-> it is a framework based on node.js hume server banane deta using easy functions

const express=require("express");
const { Server } = require("socket.io");

const app=express();//through this line our server is created
const http = require('http');
const server = http.createServer(app);

const io=new Server(server);//io naam ka object banaya socket io se

app.use(express.static("public"));//isse jo files public folder main hai vo ab static file ban gaye hai

let userlist=[];//can be used to show online list

//connection event is attached on io
//jab bhi koi app se koi bhi socket io connect hoga to yeh function chalega
io.on("connection",function(socket)
{
    console.log(socket.id+" connected ");
   

    socket.on("userConnected",function(username){

        let userObject={id:socket.id,username:username};
        userlist.push(userObject);
        console.log(userlist);

        //for self
        socket.emit("online-list",userlist);

        //brodcast a message to allother clients except sender
        socket.broadcast.emit("join",userObject);

        
       
    })


    socket.on("chat",function(chatobj){
       
        socket.broadcast.emit("chatleft",chatobj);
    })
    socket.on("disconnect",function(){
        let leftuserobj;
        let remaininguser=userlist.filter(function(userObject){
            if(userObject.id==socket.id)
            {
                leftuserobj=userObject;
                return false;
            }
        
            return true;
        })
        userlist=remaininguser;
        socket.broadcast.emit("leave",leftuserobj);
    })
})

//get method ki request on path /
// app.get("/home",function(request,response){
  

//   response.send("welcome to home page");
// })


//through this we tell where our app will be live
server.listen(5500,function()
{
    console.log("server created at port 5500");
})