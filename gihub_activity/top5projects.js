const request = require("request");
const cheerio = require("cheerio");
let getissueslink = require("./githubissues");

let fs = require("fs");

function get5project(link){
    request(link,cb);
}

function cb(error,response,data){
    parsedata(data);
}

function parsedata(html){
    let ch = cheerio.load(html);
    let topicname = ch(".h1-mktg").text().trim();
    // console.log(topicname);
    let folderpath = `./${topicname}`;
    if(!fs.existsSync(`./${topicname}`)){
        // create Folder on the basis of topic name !!
        fs.mkdirSync(`./${topicname}`);
    }

    let allprojecttags = ch('.f3.color-text-secondary.text-normal.lh-condensed .text-bold');

    for(let i=0;i<2;i++){
        let projecttags = allprojecttags[i+""];
        let link = ch(projecttags).attr("href"); //href nikala
        let completeLinkproject = "https://github.com"+link;
        // console.log(completeLinkproject);
        getissueslink(completeLinkproject,folderpath);
    }
}
module.exports = get5project;