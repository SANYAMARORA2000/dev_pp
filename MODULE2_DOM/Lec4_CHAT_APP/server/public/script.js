
let chatInput = document.querySelector(".chat-input");
let chatwindow=document.querySelector(".chat-window");
let myname=document.querySelector(".me .user-name");
let username = prompt("Enter Your Name ");
myname.textContent=username;

chatInput.addEventListener("keypress" , function(e){
    
    if(e.key=="Enter")
    {
        let chatdiv= document.createElement("div")
        chatdiv.classList.add("chat");
        chatdiv.classList.add("right");
        chatdiv.textContent = username+" : "+chatInput.value;
        chatwindow.append(chatdiv);
        //emit chat message and your name
        socket.emit("chat",{username,chat:chatInput.value});
        chatInput.value="";


    }
    
})
