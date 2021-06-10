let sub=document.querySelector(".registerbtn");
console.log(sub);

sub.addEventListener("click", (e)=>{

     e.preventDefault();
    
     let id=document.querySelector("#email");
     let nam=document.querySelector("#name");
     let pref=document.querySelector("#dropdown1");
     let days=document.querySelector("#dropdown2");
     let meal=document.querySelector("#dropdown3");

     
     console.log(id.value+","+id.value+","+pref.value+","+days.value+","+meal.value);

    alert("form submitted") ;        
    
    

});
