import React, { useState, useEffect } from 'react';


const Header = () => {
    
    
    const[responseplus1,setresponseplus1]=useState(1);
    const[responseplus2,setresponseplus2]=useState(1);
    

   
 

     const handleplus=()=>
     {
        
        setresponseplus1(responseplus1+1);
    
       
      
        setresponseplus2(responseplus2+2);
        
     }
     const handleminus=()=>{

        setresponseplus1(responseplus1-1);
        setresponseplus2(responseplus2-2);
     }

    return ( <div className="container">
      <div className="input">
            <button onClick={handleplus}>+</button>
            <button onClick={handleminus}>-</button>
      </div>
      <div className="output">
           
          <p>{responseplus1}</p>
          <p>{responseplus2}</p>   
           
        
      </div>
    </div>);
}
 
export default Header;