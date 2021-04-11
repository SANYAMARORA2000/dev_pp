
// The main objective of this project is to create a Youtube playlist of Top 10 new released hindi songs

const puppeteer=require("puppeteer");
let id="abc730189@gmail.com";
let pw="123456789AB!!";


(async function()
{
     let browser=await puppeteer.launch({headless:false,defaultViewport:null});
     let allPages = await browser.pages();
     let tab=allPages[0];
    await tab.goto("https://gaana.com/");

    // ******************** Data form ganna.com has been picked here ******************** 
    await tab.waitForSelector('.hover-events-parent img[title="New Releases Hot 50 - Hindi"]');
    await tab.waitForTimeout(5000);
    await tab.click('.hover-events-parent img[title="New Releases Hot 50 - Hindi"]');
    await tab.waitForTimeout(2000);
    // *********************************************************************************


    
     // ******************** Top 50 songs names picked up ********************  
    await tab.waitForSelector('.playlist_thumb_det');
    let top50songs= await tab.$$('.playlist_thumb_det');
    let songsarray=[];
    for(let i=0;i<top50songs.length;i++)
    {
        let song=top50songs[i];
        let writtenparttext=await tab.evaluate(function(elem){
             return  elem.textContent;
            },song);
            songsarray.push(writtenparttext)
    }
   // *********************************************************************************
  
    // ****************************** Login performed ************************************************
         let sitelink="https://www.youtube.com/";
         await tab.goto(sitelink);
         await tab.waitForSelector(".style-scope.ytd-masthead.style-suggestive.size-small .yt-simple-endpoint.style-scope.ytd-button-renderer ");
         await tab.click(".style-scope.ytd-masthead.style-suggestive.size-small .yt-simple-endpoint.style-scope.ytd-button-renderer ");
         await tab.waitForSelector(".whsOnd.zHQkBf#identifierId");
         await tab.type(".whsOnd.zHQkBf#identifierId",id);
         await tab.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b');
         await tab.waitForSelector('.Xb9hP input[type="password"]');
         await tab.waitForTimeout(1000);
         await tab.type('.Xb9hP input[type="password"]',pw);
         await tab.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b');
  
     // ***********************************************************************************************
  
     for(let i=0;i<10;i++)
    {
     
      await tab.waitForTimeout(2000);
      await openyoutube(sitelink,browser,songsarray[i]);
    
    }
    await showplaylist(browser,sitelink);// Playlist shown after its creation


   




})();

async function openyoutube(sitelink,browser,content)
{
    let newTab=await browser.newPage();
    await  newTab.goto(sitelink);

   // *************************** Search for the video of the song ********************************************
    await newTab.waitForSelector(".ytd-searchbox-spt#search-input");
    await newTab.click(".ytd-searchbox-spt#search-input");
    await newTab.type(".ytd-searchbox-spt#search-input",content);
    await newTab.click(".style-scope.ytd-searchbox#search-icon-legacy")
  // ***********************************************************************************************************

    await newTab.waitForSelector('.text-wrapper.style-scope.ytd-video-renderer');
    await newTab.click('.text-wrapper.style-scope.ytd-video-renderer'); // First video link selected
    await newTab.waitForTimeout(5000);
   
   // *************************** Video is being saved in My playlist ********************************************
    await newTab.waitForSelector('#top-level-buttons .yt-simple-endpoint.style-scope.ytd-button-renderer button[aria-label="Save to playlist"]');
    await newTab.click('#top-level-buttons .yt-simple-endpoint.style-scope.ytd-button-renderer button[aria-label="Save to playlist"]');
    await newTab.waitForSelector(' yt-formatted-string[aria-label="my playlist Private"]')
    await newTab.click('yt-formatted-string[aria-label="my playlist Private"]');
    await newTab.waitForTimeout(5000);
    await newTab.click('.style-scope.ytd-add-to-playlist-renderer #button');
  // **************************************************************************************************************

     await newTab.close();// Tab is closed after the work is done
      


}
async function showplaylist(browser,sitelink)
{
    // *************************** Playlist displayed ********************************************  
   let tab1=await browser.newPage();
   await  tab1.goto(sitelink);
   tab1.waitForTimeout(3000);
   tab1.click('a[href="/playlist?list=PLWg-T2dWpP_klE6kwz5onjW2f-drD7yHU"]');
    // *************************** Search for the video of the song ******************************

  



}