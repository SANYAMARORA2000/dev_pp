let abc=[
    { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
    { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
  ];

  let arr=[];
  for(let i=0;i<abc.length;i++)
  {
      let obj=abc[i];
      let name=obj.name
      let rainfalldata=obj.rainfall;
      //console.log(rainfalldata);
     let sum=0;
      
      for(let i=0;i<rainfalldata.length;i++)
      {
           sum=sum+rainfalldata[i];
      }
     let finalans=sum/rainfalldata.length;

     let obj1={
         Name:name,
         Sum:finalans
     }

      arr.push(obj1);

  }
  console.log(arr);