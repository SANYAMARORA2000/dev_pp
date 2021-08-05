console.log("hi everyone");

let a=10;
let b=20;

console.log(a);
console.log(b);

// variable is not assigned a value
let e; // takes up undefined
console.log(e);

if (true) {
    let f = "I am inside if block !!!";
    console.log(f);
    // console.log(a);
    // a = 20;
  }
  //console.log(f);

  const pi = 3.14; // define
//pi = 20; // resassignment is not allowed in const
//console.log(pi);

console.log(10=="10");//yeh yaha pe sirf value dekh rhaa hai
console.log(10==="10");//yaha pe vo data type bhi dekhega

//objects= hote hai key values ke pair

//let movies={};//empty object hai yeh

let data={
    name:"steve rogers",
    place:"pitampura"

};
console.log(data.name);//object se name mangwaya
console.log(data.place);//object se place mangwaya

let key = "name";
//data.key;
// console.log( key );

// bracket notation
console.log(data[key]);