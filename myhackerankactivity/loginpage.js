const puppeteer=require('puppeteer');
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
let tab;
let pos;
let gcode;


let browseropenpromise=puppeteer.launch({headless:false,defaultViewport:null});


browseropenpromise.then(function(browser){
    console.log("browser opened")
    let pagespromise=browser.pages();
    return pagespromise
})

.then(function(pages){
      tab=pages[0];
      let loginpagepromise=tab.goto("https://www.hackerrank.com/auth/login");
      return loginpagepromise;
})
.then(function()
{
     let IDtypepromise=tab.type("#input-1",id);
     return IDtypepromise
    
})
.then(function(){
    let pwtypepromise=tab.type("#input-2",pw);
     return pwtypepromise
})
.then(function(){
    let loginclickpromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginclickpromise;
})
.then(function(){

    let probsolveclickpromise=waitandClick('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-line-primary.ui-btn-link.ui-btn-styled');
    return probsolveclickpromise;
})

.then(function(){
    let quespagewaitpromise=tab.waitForSelector(".js-track-click.challenge-list-item");
    return quespagewaitpromise;
})
.then(function(){
    let quespagewaitpromise=tab.$$(".js-track-click.challenge-list-item");
    return quespagewaitpromise;
})
.then(function(allQuesatag)
{
    let quespromise=[];
    for(let i=0;i<allQuesatag.length;i++)
    {
        let atag=allQuesatag[i];
        let hrefpromise=tab.evaluate(function(elem){
            return elem.getAttribute("href");
        },atag)

        quespromise.push(hrefpromise)
    }
    let sbkaPromise=Promise.all(quespromise);
    return sbkaPromise;
})
.then(function(alllinks){
    
    let links=[];
    for(let i=0;i<alllinks.length;i++)
    {
        let link=alllinks[i];
        let completeLinks="https://www.hackerrank.com/"+link

        links.push(completeLinks);
    } 
   // console.log(links)
     let quessolvedpromise=solveQuestion(links[1]);
     quessolvedpromise.then(function(){
         console.log("one question solved")
     })
})

function pastecode()
{
    return new Promise(function(resolve,reject){
        let problembuttonclick=tab.click('#tab-1-item-0');
        problembuttonclick.then(function(){
            let checkboxbuttonclick=waitandClick('.custom-input-checkbox');
            return checkboxbuttonclick;
        })

        .then(function(){
            let codetypepromise=tab.type('.custominput',gcode);
            return codetypepromise;
        })
        .then(function(){
            let controlpresspromise=tab.keyboard.down("Control");
            return controlpresspromise;
        })
        .then(function(){
            let Apresspromise=tab.keyboard.press("A");
            return Apresspromise;
        })
        .then(function(){
            let Xpresspromise=tab.keyboard.press("X");
            return Xpresspromise;
        })
        .then(function(){
            let clickpromise=tab.click('.monaco-scrollable-element.editor-scrollable.vs');
            return clickpromise;
        })
        .then(function(){
            let Apresspromise=tab.keyboard.press("A");
            return Apresspromise;
        })
        .then(function(){
            let Vpresspromise=tab.keyboard.press("V");
            return Vpresspromise;
        })
        .then(function(){
            let submitbuttonpromise=tab.click(' .pull-right.btn.btn-primary.hr-monaco-submit');
            return submitbuttonpromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error)
        })

        

    })
}

function getcode()
{
    return new Promise(function(resolve,reject){
        let headdivpromise=tab.waitForSelector('.hackdown-content h3');
        headdivpromise.then(function(){
            let headingdivspromise=tab.$$('.hackdown-content h3');
            return headingdivspromise;
             
        })
        .then(function(headingdiv){
            let divarray=[];
            for(let i=0;i<headingdiv.length;i++)
            {
                let headdiv=headingdiv[i];
                let h3promise=tab.evaluate(function(elem){
                  return elem.textContent;
                },headdiv);

                divarray.push(h3promise);
            }
            let sbkaPromise1=Promise.all(divarray);
            return sbkaPromise1;

        })
        .then(function(headings){
            // console.log(headings);
            for(let i=0;i<headings.length;i++)
            {
               let name=headings[i];
               if(name=='C++')
               {
                pos=i;
                break;
               }
            }
            let  codewrittenpromise=tab.$$('.highlight');
           return codewrittenpromise;

        })
        
            .then(function(codeatags){
                let atagarray=[];
                for(let i=0;i<codeatags.length;i++)
                {
                   let atag=codeatags[i];
                   let atagpromise=tab.evaluate(function(elem){
                       return elem.textContent;
                   },atag)
                   atagarray.push(atagpromise);
                }
                let sbkaPromise2=Promise.all(atagarray);
                return sbkaPromise2;
                
            })
               
            .then(function(codewritten)
            {
               gcode=codewritten[pos];
               resolve();
                
            })
              .catch(function (error) {
                reject(error);
              });
           

    
        

    })
}

function solveQuestion(queslink)
{
      return new Promise(function(resolve,reject){
          let quesopenpromise=tab.goto(queslink);
          
          quesopenpromise.then(function(){
             let editorialopenpromise=waitandClick('div[data-attr2="Editorial"]');
             return editorialopenpromise;
          })
          .then(function(){
              let codepromise=getcode();
              return codepromise;
          })
          .then(function(){
              let pasteCodepromise=pastecode();
              return pasteCodepromise
          })
          .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error)
        })
      })
      

}

function waitandClick(selector)
{
    return new Promise(function(resolve,reject){
        let waitpromise=tab.waitForSelector(selector);
 
        waitpromise.then(function()
        {
            let buttonclickpromise=tab.click(selector);
            return buttonclickpromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error)
        })
    })
}