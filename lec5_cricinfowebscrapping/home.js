const request=require("request");
const cheerio=require("cheerio");
const getallmatches = require("./allmatches");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);

function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html)
{
   
    let ch=cheerio.load(html)
  let atag=ch('.container-lg.p-responsive.mt-6 a');
  for(let i=0;i<atag.length;i++)
  {
    let link=atag.attr("href");
    let completelink="https://www.espncricinfo.com"+link;
  }
  
   //console.log(completelink);
   getallmatches(completelink);
   
   
    
}
