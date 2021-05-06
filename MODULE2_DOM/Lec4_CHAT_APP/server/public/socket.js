//this will send a message to server
let onlinelist=document.querySelector(".online-list");
socket.emit("userConnected",username);


socket.on("leave",function(dataobj){
    let leavediv=document.createElement("div");
    leavediv.classList.add("chat");
    leavediv.classList.add("leave");
    leavediv.textContent=`${dataobj.username} left chat`;
    chatwindow.append(leavediv);

    deletefromonlinelist(dataobj.id);

});

socket.on("join",function(dataobj){

    let joindiv=document.createElement("div");
    joindiv.classList.add("chat");
    joindiv.classList.add("join");
    joindiv.textContent=`${dataobj.username} joined chat`;
    chatwindow.append(joindiv);

    addinonlinelist(dataobj);


})

socket.on("chatleft",function(chatobj){
    let chatdiv= document.createElement("div")
    chatdiv.classList.add("chat");
    chatdiv.classList.add("left");
    chatdiv.textContent = chatobj.username+" : "+chatobj.chat;
    chatwindow.append(chatdiv);

})

socket.on("online-list",function(userlist){
    //console.log(userlist);

    for(let i=0;i<userlist.length;i++)
    {
        if(userlist[i].id!=socket.id)
        {
            let userdiv=document.createElement("div");
            userdiv.classList.add("user");
            userdiv.setAttribute("id",userlist[i].id);
            userdiv.innerHTML=` <div class="user-image">
            <img src="default.png" alt="">
             </div>
              <div class="user-name">${userlist[i].username}</div>`

              onlinelist.append(userdiv);
        }
    }
   
//     <!-- <div class="user">

//                         <div class="user-image">
//                             <img src="default.png" alt="">
//                         </div>
//                         <div class="user-name">tony</div>
//                     </div> -->


})

function deletefromonlinelist(id){
   // console.log("inside deletefromonlinelist");
    
   document.querySelector(`#${id}`).remove();

}

function addinonlinelist(userObj){
    // console.log("inside addinonlinelist");
    let userdiv=document.createElement("div");
            userdiv.classList.add("user");
            userdiv.setAttribute("id",userObj.id);
            userdiv.innerHTML=` <div class="user-image">
            <img src="default.png" alt="">
             </div>
              <div class="user-name">${userObj.username}</div>`

              onlinelist.append(userdiv);

}