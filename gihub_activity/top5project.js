const request=require("request");
const cheerio=require("cheerio");


let getproject(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
  Parsedata(data);
}


let parsedata(html)
{
    let ch=cheerio.load(html);
    let atag=ch(".f3.color-text-secondary.text-normal.lh-condensed a");
    let count=0;

}
