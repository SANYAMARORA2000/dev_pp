const request=require("request");
const cheerio=require("cheerio");
let fs=require("fs");


function repoheading(link,folderpath)
{
    request(link,function(error,response,data){

        let ch=cheerio.load(data);
        let reponames=ch('.wb-break-all a');

        for(let i=0;i<5;i++)
        {
            let names=reponames[i];
            let heading=ch(names).text().trim();
            let reponamefoler=folderpath+`/${heading}`;
            if(!fs.existsSync(reponamefoler))
            {
               fs.mkdirSync(reponamefoler);
            }
            let repohref=ch(names).attr("href");
            let completerepolink="https://github.com"+repohref
           // console.log(completerepolink);
           headingfile(completerepolink,reponamefoler);
            


        }

    });
    
}
function headingfile(completerepolink,reponamefoler)
{
    if(!fs.existsSync(`${reponamefoler}/link.json`))
    {
        fs.writeFileSync(`${reponamefoler}/link.json`, JSON.stringify([]));
       
    }
    let newlink= JSON.parse(fs.readFileSync(`${reponamefoler}/link.json`));
    let obj= {
        link:completerepolink
    }
    newlink.push(obj);
    fs.writeFileSync(`${reponamefoler}/link.json`, JSON.stringify(newlink));

   
}


module.exports=repoheading;

