const request=require("request");
const cheerio=require("cheerio");

const  repoheading = require("./creatorrepo.js");
let fs=require("fs");


function repofetch(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
    let ch=cheerio.load(data);
    let creatorname=ch('.p-name.vcard-fullname.d-block.overflow-hidden').text().trim();
    //console.log(creatorname);
    let folderpath=`./${creatorname}`;
    if(!fs.existsSync(folderpath))
    {
        fs.mkdirSync(folderpath);
    }
    let repobuttonlink=ch('.UnderlineNav-body a');
    let link=ch(repobuttonlink[1]).attr("href");
    let completeLink="https://github.com/"+link;
    //console.log(completeLink);
    repoheading(completeLink,folderpath);
    



}


module.exports=repofetch;