const puppeteer=require('puppeteer');
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
let tab;


let browseropenpromise= puppeteer.launch({headless: false,defaultViewport: null,args: ["--start-maximized"], slowMo :100});
//yaha se hume ek pending promise mila ---promise<pending>

browseropenpromise.then(function(browser){
    console.log("browser opened");
    //console.log(browser);
    let allPagesPromise=browser.pages();//yeh bhi ek pending promise dega aur yeh bhi array main jitne pages khule hai vo laake de dega
    return allPagesPromise

})
.then(function(pages){
     tab=pages[0];
     let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
     return pageOpenPromise;
 
})
.then(function(){
  
      let IDtypepromise=tab.type("#input-1",id);
      return IDtypepromise;

})
.then(function(){
   let Passtypepromise= tab.type("#input-2",pw);
   return Passtypepromise;
})


.then(function(){
    let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.then(function(){
    console.log("logged in to hackerrank !!!");
})


