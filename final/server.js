let express=require("express");
let nodemailer=require("nodemailer");


let app=express();
app.use(express.static("public"));
app.use(express.json());


app.post("/sendMail",async (req,res)=>{
     console.log(req.body.emailid);
    

    await sendMail(req.body.emailid,req.body.message);
})

async function sendMail(emailid)
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
                  subject:'ORDER CONFIRMED - THANK YOU FOR SHOPPING WITH TOGETHER WE-CAN',
                  text:'Dear customer, our store official will contact you shortly in order to assist you with your order'
            
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

app.listen(4000,()=>{
    console.log("server started");
})