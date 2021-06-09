const nodemailer=require("nodemailer");
 let sub=document.querySelector(".registerbtn");
 let emailid;

 
 

sub.addEventListener("click", (e)=>{

     e.preventDefault();
        
  
     let id=document.querySelector("#email");
    emailid=id.value;
    main();
    alert("form submitted") ;    
  
    

});

function main()
{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'abc730189@gmail.com', 
          pass:'123456789AB!!', 
        },
      });
    
      let mailoptions={
          from:'abc730189@gmail.com',
          to: emailid,
          subject:'ORDER CONFIRMED',
          text:'it works'
    
      }
      transporter.sendMail(mailoptions,function(err,data){
          if(err)
          {
              console.log("error occurs",err);
          }
          else
          {
              console.log("email.sent");
          }
      })
        
} 

