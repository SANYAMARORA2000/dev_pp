const request=require("request");

const cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary";

request(url,cb);

function cb(error,response,data)
{
    parsedata(data)
}

function parsedata(html)
{
    let ch=cheerio.load(html);
    let allcommentary=ch('div[itemprop="articleBody"] p');
    let data=ch(allcommentary['4']).text();
    console.log(data);
}
