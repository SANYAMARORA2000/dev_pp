
const puppeteer = require("puppeteer");
const id = "kekimo4506@aramidth.com";
const pw = "123456789AB";
let challenges=require("./challenges");

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

    await tab.waitForSelector('.btn.btn-green.backbone.pull-right',{visible:true});
    let createchallengebtn=await tab.$('.btn.btn-green.backbone.pull-right');
    let createchallengelink=await tab.evaluate(function(elem){
        return  elem.getAttribute("href");
    },createchallengebtn);
    createchallengelink='https://www.hackerrank.com'+createchallengelink;

    //simultaneously open numerous tabs
    // for(let i=0;i<challenges.length;i++)
    // {
    //   //adds a single challenge
    //    addchallenges(challenges[i],browser,createchallengelink)
    // }

    //add challenges one by one
    // for(let i=0;i<challenges.length;i++)
    // {
    //   //adds a single challenge
    //     await addchallenges(challenges[i],browser,createchallengelink)// yeh tab tak wait karega jab ek tab ka kaam poora na ho jayeg jab hoga tab close ho jayega
    // }

   // await addchallenges(challenges[0],browser,createchallengelink)
    


})();

async function addchallenges(challenge,browser,createchallengelink)
{
  let challengename=challenge["Challenge Name"];
  let description=challenge["Description"];
  let problemstatement=challenge["Problem Statement"];
  let inputformat=challenge["Input Format"];
  let constraints=challenge["Constraints"];
  let outputformat=challenge["Output Format"];
  let tags=challenge["Tags"];

  let newTab=await browser.newPage();//this opens a new tab for us
  await newTab.goto(createchallengelink);
  //newTab.close();
  await newTab.waitForSelector('#name' , {visible:true});
  await newTab.type('#name' , challengename );
    await newTab.type('#preview' , description);
    await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea', {visible:true});
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemstatement );
    await newTab.type('#input_format-container .CodeMirror textarea' , inputformat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputformat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();

  

}