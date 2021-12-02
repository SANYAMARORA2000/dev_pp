var emailValidator = require("email-validator");
const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const cryto=require('crypto');
const { Touchscreen } = require("puppeteer");

const db_link='mongodb+srv://admin:i2VKt0jT9ZnFv5wv@cluster0.4asjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
    console.log(db);
    console.log("database connected");
}).catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }

    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmpassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmpassword==this.password
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

// userSchema.pre('save',function(){
//     console.log('before saving in db',this);
// })

// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc);
// })
userSchema.pre('save',function(){
   this.confirmpassword=undefined;
})

userSchema.methods.createResetToken=function(){

    const resetToken=cryto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
    
}
userSchema.methods.resetPasswordHandler=function(password,confirmpassword){

    
    this.password=password;
    this.confirmpassword=confirmpassword;
    this.resetToken=undefined;
    
}

// userSchema.pre('save', async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
   
// })
//now we have to make a model because we have made a dhaacha 
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;