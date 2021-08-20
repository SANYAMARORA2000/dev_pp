let arr= [
    { name: "Delhi", rainfall: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
    { name: "Noida", rainfall: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
    { name: "Dehradun", rainfall: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
    { name: "Nanital", rainfall: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] },
]

  let ans=arr.map(user=>user.rainfall);
  let ans1=arr.map(user=>user.name);
  console.log(ans1);
  
  let arr1=[];

  for(let i=0;i<ans.length;i++)
  {
      let sum=0;
      let obj={};
      for(let j=0;j<ans[i].length;j++)
      {
         sum=sum+ans[i][j];
      } 
      let avg=sum/ans[i].length;
      obj={name:ans1[i],rainfall:avg};
      arr1.push(obj);
    
   }
console.log(arr1);

