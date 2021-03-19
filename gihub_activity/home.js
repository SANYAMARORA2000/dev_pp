const request=require("request");
const cheerio=require("cheerio");
const getallmatches = require("./top5project");

let url="https://github.com/topics";


request(url,cb);

function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html)
{
    let ch=cheerio.load(html);
    let atag=ch('.container-lg.p-responsive.mt-6 a');
    for(let i=0;i<atag.length;i++)
    {
       let a=atag[i+""];
      let link=a.attr("href");
      let completelink="https://github.com/topics"+link;
      getproject(completelink);

    }
 
}
