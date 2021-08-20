
function f(str)
{
    let ans=str.split(" ");
  
  let intialval1=ans[0][0];//k
  let intialval2=ans[1][0];//f
  let arr=[]
  let str1= intialval2.concat(ans[0].slice(1));
  arr.push(str1);
  let str2= intialval1.concat(ans[1].slice(1));
  arr.push(str2);
  return arr.join(" ");


 
  
}


let ans=f("horse riding");
console.log(ans);