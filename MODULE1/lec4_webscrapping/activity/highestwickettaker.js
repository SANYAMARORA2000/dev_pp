const request=require("request");
const cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard";

let highestWickerTaker = {};
request(url,cb);

function cb(error,response,data)
{
    parsedata(data);
}


function parsedata(html)
{
    let highestWicketsSoFar=0;
     let  nameOfHighestWicketTaker;
      let economy;
    let ch=cheerio.load(html);

    let bowltables=ch('.table.bowler');
    for(let i=0;i<bowltables.length;i++)
    {
        let bowlingTable = bowltables[`${i}`];
        let allTrs = ch(bowlingTable).find("tbody tr");
        for(let j=0 ; j<allTrs.length ; j++){
            let allTds = ch(allTrs[j]).find("td");
            let wicketsTaken = ch(allTds['4']).text();
            if(wicketsTaken > highestWicketsSoFar){
                highestWicketsSoFar = wicketsTaken;
                nameOfHighestWicketTaker = ch(allTds['0']).text();
                economy = ch(allTds['5']).text();
            }


    }
}

    highestWickerTaker.name = nameOfHighestWicketTaker;
    highestWickerTaker.wickets = highestWicketsSoFar;
    highestWickerTaker.economy = economy;   
    console.log(highestWickerTaker);

} 