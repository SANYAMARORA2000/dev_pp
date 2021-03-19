let fs=require("fs");


let Leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));

//humare kaam ko table ke form main dekhne ke liye
console.table(Leaderboard);