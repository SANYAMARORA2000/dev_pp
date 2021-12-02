import React, { useState } from 'react';

const Header = () => {
    const[res,setres]=useState("");

    const handleans=()=>{

       setres(eval(res).toString())
    }
    const handleclick=(e)=>
   {
      setres(res.concat(e.target.name));
   }

    const handlebackspace=()=>{
        setres(res.slice(0,-1));

    }
    const handleclear=()=>{

      setres("");
    }


    return ( <div>
        <div class="input">
        <input type="text" value={res} />
           <button  onClick={handleans}>ANS</button>
           <button name="1" onClick={handleclick}>1</button>
           <button name="2"onClick={handleclick}>2</button>
           <button name="3"onClick={handleclick}>3</button>
           <button name="4"onClick={handleclick}>4</button>
           <button name="5"onClick={handleclick}>5</button>
           <button name="6"onClick={handleclick}>6</button>
           <button name="7"onClick={handleclick}>7</button>
           <button name="8"onClick={handleclick}>8</button>
           <button name="9"onClick={handleclick}>8</button>
           <button name="+"onClick={handleclick}>+</button>
           <button name="-"onClick={handleclick}>-</button>
           <button name="*"onClick={handleclick}>*</button>
           <button name="%"onClick={handleclick}>%</button>
          
           <button onClick={handleclear}>clear</button>
           <button onClick={handlebackspace}>Backspace</button>
           
        </div>
    </div> );
}
 
export default Header;