const puppeteer=require('puppeteer');
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
let tab;


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

    let leaderboardclickpromise=waitandClick('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    return leaderboardclickpromise;
})
.then(function(){
    let nameclickpromise=waitandClick('.ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-line-primary.ui-btn-link.ui-btn-styled');
    return nameclickpromise;
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
     solveQuestion(links[0]);
})

function solveQuestion(queslink)
{
      return new Promise(function(resolve,reject){
          let quesopenpromise=tab.goto(queslink);
          
          quesopenpromise.then(function(){
             let editorialopenpromise=waitandClick('div[data-attr2="Editorial"]');
             return editorialopenpromise;
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