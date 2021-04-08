let fs = require("fs");

// IIFE => Immediately invoked function expressions
// we use await whenever we get a pending promise

// await can be only written in async functions
//async functions by default returns a promise

console.log("start");

// async function doesnt block stack
//IIFE FUNCTION- immediately invoked function expression 
(async function(){
    try{
        // locally 
        let f1KaData = await fs.promises.readFile("./f1.txt");
        let f2KaData = await fs.promises.readFile("./f2.txt");
        console.log(f1KaData);
        console.log(f2KaData);
        // let sbkaData = await Promise.all( [f1KaPromise , f2KaPromise]);
        // console.log(sbkaData);
    }
    catch(error){
        console.log("inside catch")
        console.log(error);
    }    
})();

console.log("end");