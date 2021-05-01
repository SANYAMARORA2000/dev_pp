let filterCodes = {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#2ecc71",
    black: "#34495e",
  };


  let selectedfilter="black"
let allFilter= document.querySelectorAll(".ticket-filters div") ;//saare 4 color wale div mil jayege isee
let ticketcontainer=document.querySelector(".tickets-container");
let openmodalbtn=document.querySelector(".open-modal");
let closeModalBtn = document.querySelector(".close-modal")
//let ticketscontainer=document.querySelector(".tickets-container");
//console.log(allFilter);
//[<div></div>,<div></div>,<div></div>,<div></div>] aayege

function loadTickets(){
  if(localStorage.getItem("alltickets")){
    ticketcontainer.innerHTML = "";
    let allTickets = JSON.parse(localStorage.getItem("alltickets"));
    for(let i=0 ; i<allTickets.length ; i++){
      // object destructuring !!!
      let {ticketId , ticketFilter , ticketcontent} = allTickets[i];
      
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");
      // set the html of the ticket wala div !!
      ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketFilter}"></div>
      <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete">
      <i class="fas fa-trash" id=${ticketId}></i>
      </div>
      </div>
      <div class="ticket-content">${ticketcontent}</div>`;

     ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);
      ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handleTicketDelete);
      // append the ticket on the UI !!!!
      ticketcontainer.append(ticketDiv);
    }
  }
}
loadTickets();

openmodalbtn.addEventListener("click",handleopenmodal);
closeModalBtn.addEventListener("click" , handleCloseModal);

function toggleTicketFilter(e){
  let filters = ["red" , "blue" , "green" , "black"];
  let currentFilter = e.target.classList[1];
  let idx = filters.indexOf(currentFilter);
  idx++;
  idx = idx%filters.length;

  let currentTicket = e.target;
  currentTicket.classList.remove(currentFilter);
  currentTicket.classList.add(filters[idx]);

  let allTickets = JSON.parse(localStorage.getItem("alltickets"));
  let id = currentTicket.nextElementSibling.children[0].textContent.split("#")[1];
  console.log(id);

  for(let i=0 ; i<allTickets.length ; i++){
    if(allTickets[i].ticketId == id){
      allTickets[i].ticketFilter = filters[idx];
      break;
    }
  }

  localStorage.setItem("alltickets" , JSON.stringify(allTickets));
}

function handleopenmodal(e)
{
  let modal=document.querySelector(".modal");
  
  if(modal)
  {
    return;
  }
  let modaldiv=createAModal();
 
modaldiv.querySelector(".modal-textbox").addEventListener("click",clearmodaltextbox);
modaldiv.querySelector(".modal-textbox").addEventListener("keypress",addticket);
let allmodalfilter=modaldiv.querySelectorAll(".modal-filter");
for(let i=0;i<allmodalfilter.length;i++)
{
  allmodalfilter[i].addEventListener("click",choosemodalfilter);
}
ticketcontainer.append(modaldiv);
}
function handleTicketDelete(e){
  let ticketToBeDeleted = e.target.id;
  let allTickets = JSON.parse(localStorage.getItem("alltickets"));
  let filteredTickets = allTickets.filter(function(ticketObject){
    return ticketObject.ticketId != ticketToBeDeleted;
  })
  localStorage.setItem("alltickets" , JSON.stringify(filteredTickets));
  loadTickets();
}

function handleCloseModal(e){
  if(document.querySelector(".modal")){
    document.querySelector(".modal").remove();
  }
}

function createAModal()
{
  let modaldiv=document.createElement("div");//div bana dega
  modaldiv.classList.add("modal");

  modaldiv.innerHTML=`<div class="modal-textbox" data-typed="false" contenteditable="true">
  Enter your task here
</div>
<div class="modal-filter-options">
       <div class="modal-filter red"></div>
       <div class="modal-filter blue"></div>
       <div class="modal-filter green"></div>
       <div class="modal-filter black active-filter"></div>
</div>`;
return modaldiv;
}
function choosemodalfilter(e)
{
  let selectedmodalfilter=e.target.classList[1];
  if(selectedmodalfilter==selectedfilter)
  {
    return;
  }
  selectedfilter=selectedmodalfilter;
  document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
  e.target.classList.add("active-filter");
}

function addticket(e)
{
  if(e.key=="Enter")
  {
    let modaltext=e.target.textContent;
    let ticketId = uid();
    let ticketdiv=document.createElement("div");//div bana dega
    ticketdiv.classList.add("ticket");
    ticketdiv.innerHTML = ` <div class="ticket-filter ${selectedfilter}"></div>
    <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete">
      <i class="fas fa-trash" id=${ticketId}></i>
      </div>
      </div>
    <div class="ticket-content">${modaltext}</div>`;

    ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);
    ticketdiv.querySelector(".ticket-delete").addEventListener("click" , handleTicketDelete);
    ticketcontainer.append(ticketdiv);
    
    e.target.parentNode.remove();
    //ticket has been appended on the document
    if(!localStorage.getItem(`alltickets`))
    {
      //first time ticket aayegi
      let alltickets=[];
      let ticketobject={};
      ticketobject.ticketId=ticketId;
      ticketobject.ticketFilter=selectedfilter;
      ticketobject.ticketcontent=modaltext;

      alltickets.push(ticketobject);

      localStorage.setItem("alltickets",JSON.stringify(alltickets));
      

    }
    else
    {
      //already tickets hai
      let alltickets=JSON.parse(localStorage.getItem(`alltickets`)) ;
      let ticketobject={};
      ticketobject.ticketId=ticketId;
      ticketobject.ticketFilter=selectedfilter;
      ticketobject.ticketcontent=modaltext;

      alltickets.push(ticketobject);

      localStorage.setItem("alltickets",JSON.stringify(alltickets));
    }

    selectedfilter="black";
  }
  
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

function choosefilter(e) {
  if(e.target.classList.contains("active-filter")){
    // if active filter already present !!
    e.target.classList.remove("active-filter");
    loadTickets();
    return;
  }
  // remove active filter from already selected filter
  if(document.querySelector(".filter.active-filter")){
    document.querySelector(".filter.active-filter").classList.remove("active-filter");
  }
  // add active filter on now selected filter !!
  e.target.classList.add("active-filter");
  let ticketFilter = e.target.classList[1];
  loadSelectedTickets(ticketFilter);
}
function loadSelectedTickets(ticketFilter){
  if(localStorage.getItem("alltickets")){
    let allTickets = JSON.parse(localStorage.getItem("alltickets"));
    
    let filteredTickets = allTickets.filter( function(filterObject){
      return filterObject.ticketFilter == ticketFilter;
    });

    // console.log(filteredTickets);

    // empty tickets container
    ticketcontainer.innerHTML = "";
    for(let i=0 ; i<filteredTickets.length ; i++){
      let {ticketId , ticketFilter , ticketcontent} = filteredTickets[i];
      
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");
      // set the html of the ticket wala div !!
      ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketFilter}"></div>
      <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete">
      <i class="fas fa-trash" id=${ticketId}></i>
      </div>
      </div>
      <div class="ticket-content">${ticketcontent}</div>`;

      ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);
      ticketDiv.querySelector(".ticket-delete").addEventListener("click" , handleTicketDelete);
      
      // append the ticket on the UI !!!!
      ticketcontainer.append(ticketDiv);
    }

  }
}