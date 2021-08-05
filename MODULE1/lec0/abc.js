function f(num1,num2)
{
      if(num1%2==0)
      {
          let b=num1%num2;
          if(b==0)
          {
              return true;
          }
          else
          {
              return false;
          }
      }
      else
      {
          
         return false;
      }
}


let a=f(3,4);
console.log(a);