let filterCodes = {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#2ecc71",
    black: "#34495e",
  };

let allFilter= document.querySelectorAll(".ticket-filters div") ;//saare 4 color wale div mil jayege isee
let ticketcontainer=document.querySelector(".tickets-container");
let openmodalbtn=document.querySelector(".open-modal");
//let ticketscontainer=document.querySelector(".tickets-container");
//console.log(allFilter);
//[<div></div>,<div></div>,<div></div>,<div></div>] aayege

openmodalbtn.addEventListener("click",handleopenmodal);

function handleopenmodal(e)
{
  let modal=document.querySelector(".modal");
  
  if(modal)
  {
    return;
  }
  let modaldiv=document.createElement("div");//div bana dega
  modaldiv.classList.add("modal");

  modaldiv.innerHTML=`<div class="modal-textbox" data-typed="false" contenteditable="true">
  Enter your task here
</div>
<div class="modal-filter-options">
       <div class="modal-filter red"></div>
       <div class="modal-filter blue"></div>
       <div class="modal-filter green"></div>
       <div class="modal-filter black"></div>
</div>`;
modaldiv.querySelector(".modal-textbox").addEventListener("click",clearmodaltextbox);
ticketcontainer.append(modaldiv);
}

function clearmodaltextbox(e)
{
  if(e.target.getAttribute("data-typed")=="true")
  {
    return;
  }
    e.target.innerHTML='';
    e.target.setAttribute("data-typed","true");
}



for(let i=0;i<allFilter.length;i++)
{
    allFilter[i].addEventListener("click",choosefilter);//chaaro div se click associated kar diya
}

function choosefilter(e)
{
   // console.log(e);
    let filter=e.target.classList[1];
    let filtercode=filterCodes[filter];
    ticketcontainer.style.background=filtercode;
}