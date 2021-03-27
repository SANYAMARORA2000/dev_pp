
let str="not picking";

let arr=str.split(" ");
let a=arr[0];
let b=arr[1];


function swap(e,f)
 {
     let c=a[0];
     let d=b[0];
     
     console.log(c);
     console.log(d);
     
         a[0]=d;
         b[0]=c
    //   console.log(b[0]);
    //   console.log(a,b);

    // b[0]=temp;

    console.log(e,f);
}
 swap(a,b);
