let n = 45;
let ans = 0;
let pow =1;
while(n!=0){
    let rem = n%2;
    n = n/2;
    console.log(n);
    ans = ans + rem*pow;
    // console.log(ans);
    pow=pow*10;
}
// console.log(ans);


