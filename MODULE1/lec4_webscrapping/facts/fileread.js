const fs = require("fs");
const cheerio = require("cheerio");


let htmlKaData = fs.readFileSync("./index.html");
// htmlKaData => html treat to

let ch = cheerio.load(htmlKaData);//cheerio main html ki file load kar di

//console.log(ch);

// let pTags = ch(".main").text();
// console.log(pTags);

let pTags = ch("p");
console.log(ch(pTags['1']).text());

//<p class="main">I am a p tag in body !!!</p> => object form








// html me se => selector ke base => element get