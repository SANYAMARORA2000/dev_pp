const request=require("request");
const cheerio=require("cheerio");
const  repofetch = require("./repo.js");

let url="https://github.com/Github";

request(url,cb);

function cb(error,response,data)
{
    let ch=cheerio.load(data);
     let heading=ch('.js-profile-tab-count-container.UnderlineNav.hx_UnderlineNav li a');
     //console.log(heading);
     let link=ch(heading[2]).attr("href");
     //console.log(link);
     let completeLink="https://github.com"+link;
     //console.log(completeLink);

     people(completeLink)
}

function people(link)
{
    request(link,cb1);

}
function cb1(error,response,data)
    {
        let ch=cheerio.load(data);
        let repocreators=ch('.css-truncate-target.f4');//30 tags
        //console.log(repocreators);

        for(let i=0;i<2;i++)
        {
            let creator=repocreators[i];
            let creatorhref=ch(creator).attr("href");
            let completecreatorlink="https://github.com"+creatorhref
            //console.log(completecreatorlink);
            repofetch(completecreatorlink);

        }

        
    }
