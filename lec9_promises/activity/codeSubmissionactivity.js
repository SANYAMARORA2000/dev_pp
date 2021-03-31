const puppeteer=require('puppeteer');
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
let tab;
let idx;
let gCode;


let browseropenpromise= puppeteer.launch({headless: false,defaultViewport: null,args: ["--start-maximized"], slowMo :20});
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
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})

.then(function(){
    console.log("logged in to hackerrank !!!");
})

.then(function(){
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise; //Promise<Pending>
  })
  .then(function(){
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function(){
    let waitPromise=tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});//questions wale page pe aye hai to wait lagana padega taki wo load ho jaye
    return waitPromise;
  }
  )
  .then(function(){
           let allQuesatagpromise=tab.$$(".js-track-click.challenge-list-item");//yeh questions wale page pe jaake queryselector.all chala dega
           return allQuesatagpromise;
  })
  .then(function(allQuesatag)
  {
     let alllinkspromise=[];//code khatam hone ke baad ismain array of links honge [promise<pending>,promise<pending>,promise<pending>,promise<pending>]
    for(let i=0;i<allQuesatag.length;i++)
    {
      let atag=allQuesatag[i];
       //pehle yeh ek pending promise deta hai promise<pending> =>promise<link>
      //yeh jo element leta hai vo avtually atag hi hota hai      
      let linkpromise=tab.evaluate( function(elem){
        return elem.getAttribute("href");//yaha pe hum vo function batate ha jo hume dom pe perform karna hota hai
      },atag)//yeh ek call back function aur element maangta hai

      alllinkspromise.push(linkpromise);
    }

    let sbkapromise=Promise.all(alllinkspromise);
    return sbkapromise;//jab state change hongi to array of links milega
    // console.log("Got all a tags");
    // console.log(allQuesatag);//yaha hume array of objects mile hai jo asli mai yeh hai =>[<a> ,<a>,<a>,<a>]
    // console.log(allQuesatag.length);
    
    
})
.then(function (allLinks) {
  // [ link , link , link , link]
  let completeLinks = allLinks.map(function (link) {
    return "https://www.hackerrank.com" + link;
  });
  console.log(completeLinks);
  let oneQuesSolvePromise = solveQuestion(completeLinks[0]);
  return oneQuesSolvePromise;
})





//   .then(function(){
//     console.log("Reached Warmup Page !!!");
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

function waitAndClick(selector)
{
    return new Promise(function(resolve , reject){
      let waitPromise = tab.waitForSelector(selector , {visible:true});
      waitPromise.then(function(){
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function(){
        // wait and click succesfully done
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    });
}
function pasteCode(){
  return new Promise(function(resolve,reject){
    let problemTabClickPromise = tab.click('div[data-attr2="Problem"]');
    problemTabClickPromise;
    problemTabClickPromise.then(function(){
        let waitandclickpromise=waitAndClick(".custom-input-checkbox");
        return waitandclickpromise
   })
     .then(function(){
       let waitfortextboxpromise=tab.waitForSelector(".custominput");
      //  console.log("test input box opened");
      return waitfortextboxpromise;
     })
     .then(function(){
       let codetypepromise=tab.type(".custominput",gCode);
       return codetypepromise;
     })
     .then(function(){
            let controlkeydownpromise= tab.keyboard.down("Control");
            return controlkeydownpromise;
     })

     .then(function(){
      let akeypresspromise= tab.keyboard.press("A");
      return akeypresspromise;
     })
     .then(function(){
      let xkeypresspromise= tab.keyboard.press("X");
      return xkeypresspromise;
     })
     .then(function(){
       let clickedoncodeboxpromise=tab.click(".monaco-editor.no-user-select.vs");
       return clickedoncodeboxpromise;
     })
     .then(function(){
      let akeypresspromise= tab.keyboard.press("A");
      return akeypresspromise;
     })
     .then(function(){
      let vkeypresspromise= tab.keyboard.press("V");
      return vkeypresspromise;
     })
     .then(function(){
            let controlkeyuppromise= tab.keyboard.up("Control");
            return controlkeyuppromise;
     })
     .then(function(){
        
      resolve();
      })
      .then(function(error){
          reject(error);
      })
  })
  
}
function getCode() {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(".hackdown-content h3");
    waitPromise
      .then(function () {
        let allCodeNamesElementsPromise = tab.$$(".hackdown-content h3");
        return allCodeNamesElementsPromise;
      })
      .then(function (allCodeNameElements) {
        // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
        let allCodeNamesPromise = [];
        for (let i = 0; i < allCodeNameElements.length; i++) {
          let codeNamePromise = tab.evaluate(function (elem) {
            return elem.textContent;
          }, allCodeNameElements[i]);
          allCodeNamesPromise.push(codeNamePromise);
        }
        // allCodeNamesPromise = [  Promise<Pending> , Promise<Pending> , Promise<Pending> ];
        let sbkaPromise = Promise.all(allCodeNamesPromise);
        return sbkaPromise; //Prmose<Pending> => Promise<["C++" , "Python" , "Java"]>
      })
      .then(function (codeNames) {
        //["C++" , "Python" , "Java"];
        for (let i = 0; i < codeNames.length; i++) {
          if (codeNames[i] == "C++") {
            idx = i;
            break;
          }
        }
        let allCodeDivPromise = tab.$$(".hackdown-content .highlight");
        return allCodeDivPromise; // Promise<Pending>
      })
      .then(function (allCodeDivs) {
        //[ <div></div> , <div></div> , <div></div> ];
        let codeDiv = allCodeDivs[idx];
        let codePromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, codeDiv);
        return codePromise;
      })
      .then(function (code) {
        gCode =code;
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}


function solveQuestion(qLink) {
  return new Promise(function (resolve, reject) {
    let gotoPromise = tab.goto(qLink);
    gotoPromise
      .then(function () {
        let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
        return waitAndClickPromise;
      })
      .then(function () {
        // this function will get code of c++ and set in gCode variable
        let codePromise = getCode();
        return codePromise;
      })
      .then(function () {
        // this function will pasteCode in the editor from the gCode variable
        let pastePromise = pasteCode();
        return pastePromise;
      })
      .then(function () {
        let submitPromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
        return submitPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error)
      })
  });
}


// .then(function(){
//   let waitingresponsepromise=tab.waitForSelector('#base-card-1-link',{visible:true});
//   return waitingresponsepromise;
// }
// )
// .then(function(){
//   let ipbuttonpromise=tab.click('#base-card-1-link');
//   return ipbuttonpromise;

// })

// .then(function(){
//   let waitingpromise=tab.waitForSelector('#base-card-6-link',{visible:true});
//   return waitingpromise;
// }
// )
// .then(function(){
//   let warmupchallengespromise=tab.click('#base-card-6-link');
//   return warmupchallengespromise;

// })