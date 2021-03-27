const fs=require("fs");


                   // yeh A ka kaam hai jo vo pending promise bhejta hai
let pendingpromise=fs.promises.readFile("./f2.txt");
console.log(pendingpromise);

//sucess call back
pendingpromise.then(function(data){
    console.log("i am inside then ka callback ie scb");
    console.log(data);
    console.log(pendingpromise);


});

//failure call back
// pendingpromise.catch(function(error){
//     console.log("i am inside catch ka callback ie fcb");
//     console.log(data);
//     console.log(pendingpromise);


// });
