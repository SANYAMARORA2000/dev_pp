const request = require("request");
const cheerio = require("cheerio");
const top5issues = require("./top5issuespage");
let fs = require("fs");

function getissueslink(link,folderpath){
    request(link,function cb(error,response,data){
    let ch = cheerio.load(data);

    let projectname = ch('a[data-pjax="#js-repo-pjax-container"]').text().trim();
    let folderpathproject = folderpath + `/${projectname}`;
    if(!fs.existsSync(folderpathproject)){
        // create Folder on the basis of topic name !!
        fs.mkdirSync(folderpathproject);
    }
    // console.log(folderpathproject);
    let allissuestag = ch('.UnderlineNav-body.list-style-none  a[data-tab-item="i1issues-tab"]');
    let atagofissueslink = ch(allissuestag).attr("href");
    let completeLinkissuepage="https://github.com"+atagofissueslink;
    //console.log(completeLinkissuepage);
    top5issues(completeLinkissuepage,folderpathproject);
    });
}


// function parsedata(html){
//     let ch = cheerio.load(html);
//     let projectname = ch();
//     let allissuestag = ch('.UnderlineNav-body.list-style-none  a[data-tab-item="i1issues-tab"]');
//     let atagofissueslink = ch(allissuestag).attr("href");
//     top5issues(atagofissueslink);
// }


module.exports = getissueslink;