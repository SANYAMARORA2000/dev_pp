const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

let leaderboard = [];//ab saaman ko ispe main push karna hai
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
           
               // console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} StrikeRate : ${strikeRate}`)
               processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes);
            }

        }
        
    console.log("##########################################");
        
   }


 }

 function processLeaderboard(teamName, batsmanName, runs, balls, fours, sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    if (leaderboard.length) {
      // leaderboard has atleast 1 object
      for (let i = 0; i < leaderboard.length; i++) {
        let obj = leaderboard[i];
        if (obj.Team == teamName && obj.Batsman == batsmanName) {
          obj.Runs += runs;
          obj.Balls += balls;
          obj.Fours += fours;
          obj.Sixes += sixes;
          return;
        }
      }
    }
    // leaderboard is empty
    let obj = {
      Team: teamName,
      Batsman: batsmanName,
      Runs: runs,
      Balls: balls,
      Fours: fours,
      Sixes: sixes,
    };
    leaderboard.push(obj);
  }
//  function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes ){
//         let leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));
//         runs = Number(runs);
//         balls = Number(balls);
//         fours = Number(fours);
//         sixes = Number(sixes);
    
//         // false , null , undefined , 0 , ""
//         if(leaderboard.length){
//             // leaderboard has atleast 1 object
//             for(let i=0 ; i<leaderboard.length ; i++){
//                 let obj = leaderboard[i];
//                 if(obj.Team == teamName && obj.Batsman == batsmanName){
//                     obj.Runs += runs;
//                     obj.Balls += balls;
//                     obj.Fours += fours;
//                     obj.Sixes += sixes;
//                     fs.writeFileSync("./leaderboard.json" , JSON.stringify(leaderboard));
//                     return;
//                 }
//             }
//         }
//             // leaderboard is empty
//             let obj = {
//                 Team : teamName ,
//                 Batsman : batsmanName ,
//                 Runs : runs ,
//                 Balls : balls ,
//                 Fours : fours ,
//                 Sixes : sixes
//             }
//             leaderboard.push(obj);
//             fs.writeFileSync("./leaderboard.json" , JSON.stringify(leaderboard));
//     }

 // when working with json file
//  function  processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes )
//  {
//      //jo data leaderboard se padgege vo string hoga to usse use karne ke liye original form main layege
//      //JSON.parse se usee object main convert karege
//      let Leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));
//     runs = Number(runs);
//     balls = Number(balls);
//     fours = Number(fours);
//     sixes = Number(sixes);
//     if(Leaderboard.length)
//     {
//                 // leaderboard has atleast 1 object
//                 for(let i=0 ; i<Leaderboard.length ; i++){
//                     let obj = Leaderboard[i];
//                     if(obj.Team == teamName && obj.Batsman == batsmanName){
//                         obj.Runs += runs;
//                         obj.Balls += balls;
//                         obj.Fours += fours;
//                         obj.Sixes += sixes;
//                         fs.writeFileSync("./leaderboard.json" , JSON.stringify(Leaderboard));
//                         return;
//                     }
//                 }

//      }
  
//        let obj={
//            Team:teamName,
//            Batsman:batsmanName,
//            Runs:runs,
//            Balls:balls,
//            Fours:fours,
//            Sixes:sixes


//        }
//        Leaderboard.push(obj);
//        fs.writeFileSync("./leaderboard.json" , JSON.stringify(Leaderboard));

    
    

//  }
module.exports = getMatch;  

