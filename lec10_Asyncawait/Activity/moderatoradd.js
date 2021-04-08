const puppeteer = require("puppeteer");
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
//let challenges=require("./challenges");


(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]',{visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]')
    
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a',{visible:true});
    let bothatags=await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let managechallengeatag=bothatags[1];
    await managechallengeatag.click();

    addmoderator(browser,tab);//it will add moderators on all pages

})();

async function addmoderator(browser,tab)
{
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allATags = await tab.$$(".backbone.block-center");
    // [<a />,<a />,<a />,<a />,<a />,<a /> ]
    let allLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let aTag = allATags[i];
        let link = await tab.evaluate( function(elem){
            return elem.getAttribute("href");
        }   , aTag );
        allLinks.push(link);
    }
    let completeLinks = allLinks.map( function(link){
        return "https://www.hackerrank.com"+link;
    });
    let allModAddPromise = []
    for(let i=0;i<completeLinks.length;i++)
    {
        let moderatorAddPromise=addmoderatortoquestion(completeLinks[i],browser);//since it is a async function it will return promise
        allModAddPromise.push(moderatorAddPromise);
    }
    await Promise.all(allModAddPromise);// wait for all the moderator to be added to all questions

    let allLis = await tab.$$('.pagination li');
    let nextBtnLi = allLis[allLis.length-2];
    let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled"); } , nextBtnLi );
    if(isDisabled){
        return;
    }
    else{
        await nextBtnLi.click();
        await addmoderator(browser , tab);
    }
    // 4. call addModerators(browser , tab);

    
}

async function addmoderatortoquestion(qlink,browser)
{
  let newTab=await browser.newPage();
  await  newTab.goto(qlink);
  await newTab.waitForSelector('li[data-tab="moderators"]',{visible:true});
   
  await newTab.waitForTimeout(3000);
  await newTab.click('li[data-tab="moderators"]');
  await newTab.waitForSelector('#moderator' , {visible:true});
    await newTab.type('#moderator' , "Sanyam");
    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();


}

