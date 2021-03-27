const request = require("request");
const cheerio = require("cheerio"); 
let fs = require("fs");



function top5issues(link,folderpathproject){
    request(link,function cb(error,response,data){
        let ch = cheerio.load(data);
        let top5atagheaderhref = ch('.flex-auto.min-width-0.p-2.pr-3.pr-md-2 a[data-hovercard-type="issue"]');
        
        for(let i=0;i<2;i++){
            let top5atag = top5atagheaderhref[i+""];
            let hreflink = ch(top5atag).attr("href");
            let  issuename= ch(top5atag).text().trim();
            let completeLinkissue = "https://github.com"+hreflink;
            
            console.log(issuename);
            console.log(completeLinkissue);

            if(!fs.existsSync(`${folderpathproject}/issues.json`)){
                    fs.writeFileSync(`${folderpathproject}/issues.json` , JSON.stringify([]));
                }
               
                    let issues = JSON.parse(fs.readFileSync(`${folderpathproject}/issues.json`));
                    let newIssue = {
                        "Issue Name":issuename,
                        "Issue Link":completeLinkissue
                    }
                    issues.push(newIssue);
                    fs.writeFileSync(`${folderpathproject}/issues.json` , JSON.stringify(issues));
          

            
        }
       
    });
}




// function processboard(completeLinkproject,){
//     let issuseboard = JSON.parse(fs.readFileSync("./issuseboard.json"));
//     let obj = {
//         href : completeLinkproject
//     }
//     issuseboard.push(obj);
//     fs.writeFileSync("./issuseboard.json",JSON.stringify(issuseboard));
// }


module.exports = top5issues;