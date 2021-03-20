const request = require("request");
const cheerio = require("cheerio");
const get5project = require("./top5projects");
let fs = require("fs");


request("https://github.com/topics",cb);

function cb(error,response,data){
    parsedata(data);
}

function parsedata(html){
    let ch = cheerio.load(html);
    let alltag = ch('.container-lg.p-responsive.mt-6 a');

    for(let i=0;i<alltag.length;i++){
        let atag = alltag[i + ""];
        let link = ch(atag).attr("href");
    // let link = atag['0']["attribs"]["href"];
    let completeLink = "https://github.com"+link;
    // console.log(completeLink);
    get5project(completeLink);
    }
}