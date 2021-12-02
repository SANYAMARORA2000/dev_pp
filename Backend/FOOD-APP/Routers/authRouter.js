const express=require("express");
const authRouter=express.Router();
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets')
const userModel=require('../models/userModel');




authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser)

function middleware1(req,res,next)
{
    console.log('middleware1 encountered');
    next();
}

function middleware2(req,res)
{
    console.log('middleware2 encountered');
    console.log('middleware 2 ended req/res cycle');
    res.sendFile('/public/index.html',{root:__dirname})
}
function getSignUp(req,res,next)
{
    
    console.log("get signUp called");
    next();
  
}
async function postSignUp(req,res)
{
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
  
   console.log(user);
      res.json({
    message:"user signed up",
    data:user
})

}

async function loginUser(req,res)
{
    try
    {
        let data=req.body;
        if(data.email)
        {
            let user=await userModel.findOne({email:data.email});
            if(user)
            {
               if(user.password==data.password)
               {
                   let uid=user['_id'];//uid
                   let token=jwt.sign({payload:uid},JWT_KEY)
                   res.cookie('login',token,{httpOnly:true});
                 return   res.json({
                     message:"user logged in",
                     userDetails:data
                 })
               }
               else
               {
                 return   res.json({
                     message:"wrong credentials",
                 })
               }
            }
            else
            {
                return   res.json({
                 message:"user not found",
                })
            }
        }
        else
        {
            return   res.json({
                message:"Empty field found",
               })
        }
       
    }
    catch(err)
    {
        return   res.json({
            message:err.message,
           })
    }
}

module.exports=authRouter;