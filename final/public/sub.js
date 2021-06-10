let button=document.querySelector(".registerbtn");
let id=document.querySelector("#email");



button.addEventListener("click",async function(){
   
  let emailid=id.value;
 
  console.log(emailid);
  alert("Form Submitted Successfully") ;       
  await axios.post("/sendMail",{emailid});
   
     
    

});
