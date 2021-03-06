

// function hello(name)
// {
//     console.log(name+" is printintg this in function");
//     return 10;
// }



// console.log(hello("sanyam"));
//console.log(hello());//this will give error as the function is not returning anything

function getfirstname(fullname)
{
    let a=fullname.split(" ");
    return a[0];
}
function getsecondname(fullname)
{
    let b=fullname.split(" ");
    return b[1];
}
function sayhi(fullname,fun)
{
    let name=fun(fullname);
    console.log(name);
}
sayhi("tony stark",getfirstname);
sayhi("steve rogers",getsecondname);
