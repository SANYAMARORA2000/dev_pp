const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");


function getMatch(link) 
{
    request(link, cb);
}

function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html)
{
   
    let ch=cheerio.load(html);
    let bothinnings=ch('.match-scorecard-page .Collapsible');
   

    for(let i=0;i<bothinnings.length;i++)
    {
        let inning=ch(bothinnings[i+""]);
        let teamName=inning.find("h5").text();
        teamName=teamName.split("INNINGS")[0].trim();
        console.log(teamName);

        let batsmanTable = inning.find('.table.batsman');
        let allTrs=batsmanTable .find("tbody tr");
       

        for(let j=0;j<allTrs.length-1;j++)
        {
            let allTds=ch(allTrs[j]).find("td");
            if(allTds.length>1)
            {
                let batsmanName=ch(allTds['0']).text().trim();
                let runs=ch(allTds['2']).text().trim();
                let balls=ch(allTds['3']).text().trim();
                let fours=ch(allTds['5']).text().trim();
                let sixes=ch(allTds['6']).text().trim();
                let strikeRate = ch(allTds['7']).text().trim();
                console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} StrikeRate : ${strikeRate}`)
               // processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }

        }
        
    console.log("##########################################");
        
   }


 }

 function checkfolder(teamName)
 {
     let path=`./IPL/${teamName}`;
     return fs.existsSync(path);

 }
 function createfolder(teamName) 
 {
    let path=`./IPL/${teamName}`;
    fs.mkdirSync(path);
 }

 function filepresent(teamName,batsmanName)
 {
    let path=`./IPL/${teamName}/${batsmanName}.json`;
     return fs.existsSync(path);

 }
 function updatefile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}
 function createfile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate) 
 {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    let stringifiedData = JSON.stringify(batsmanFile); // [object] => [ {}]
    fs.writeFileSync(batsmanPath , stringifiedData  );

    
 }

 function  processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate)
 {
     let flag=checkfolder(teamName);
     if(flag)
     {
         let flag1=filepresent(teamName,batsmanName);
         if(flag1)
         {
            updatefile(teamName, batsmanName, runs, balls, fours, sixes,strikeRate);
         }
         else
         {
            createfile(teamName, batsmanName, runs , balls , fours , sixes , strikeRate) ;
         }
           

     }
     else
     {
        createfolder(teamName) ;
        createfile(teamName, batsmanName, runs , balls , fours , sixes , strikeRate) ;

     }

 }
module.exports = getMatch;  

