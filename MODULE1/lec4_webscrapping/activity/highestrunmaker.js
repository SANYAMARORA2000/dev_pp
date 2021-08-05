const request=require("request");
const cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let highestRunmaker={};
request(url,cb);


function cb(error,response,data)
{
    parsedata(data);

}

function parsedata(html)
{
    let highestrunmade=0;
    let nameOfHighestrunmaker;


    let ch=cheerio.load(html)
    let allbatsmantable=ch('.table.batsman');
    for(let i=0;i<allbatsmantable.length;i++)
    {
        let batsmandetail=allbatsmantable[`${i}`];
        let allTrs=ch(batsmandetail).find("tbody tr");
        for(let j=0;j<allTrs.length;j++)
        {
            let allTds=ch(allTrs[j]).find("td");
            let highestrun=ch(allTds['2']).text();
            if(highestrun>highestrunmade)
            {
                highestrunmade=highestrun;
                nameOfHighestrunmaker=ch(allTds['0']).text();
            }
        }




    }
    highestRunmaker.name=nameOfHighestrunmaker;
    highestRunmaker.runs=highestrunmade;

    console.log(highestRunmaker)
   
    
}
