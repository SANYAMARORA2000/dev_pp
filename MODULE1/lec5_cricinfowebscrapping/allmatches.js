const request=require("request");
const cheerio=require("cheerio");
const getMatch = require("./match");


function getallmatches(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html)
{
   
    let ch=cheerio.load(html);
    let scorecardlinks=ch('a[ data-hover="Scorecard"]');

    for(let i=0;i<scorecardlinks.length;i++)
    {
        let atags=scorecardlinks[i+""];
        let link=ch(atags).attr("href");
        let completeLink="https://www.espncricinfo.com"+link;
        getMatch(completeLink);
    }

}
module.exports=getallmatches;