import React, { useState, useEffect } from 'react';


const Header = () => {

    const[result,setresult]=useState("");

   const clear=()=>
   {
       setresult("");
   }
   const backspace=()=>
   {
      setresult(result.slice(0,-1))
   }
   const handleclick=(e)=>
   {
      setresult(result.concat(e.target.name));
   }

   const handleans=()=>
   {
       setresult(eval(result).toString());
   }

   

    return ( <div class="container">
        <div className="inputhandle">
            <input type="text" value={result} />
        </div>
        <div>
              <button onClick={clear}>C</button>
             <button onClick={backspace}>backspace</button>
             <button name="1" onClick={handleclick}>1</button>
             <button name="2" onClick={handleclick}>2</button>
             <button name="3" onClick={handleclick}> 3</button>
             <button name="4" onClick={handleclick}>4</button>
             <button name="5" onClick={handleclick}>5</button>
             <button name="6" onClick={handleclick}> 6</button>
             <button name="7" onClick={handleclick}>7</button>
             <button name="8" onClick={handleclick}>8</button>
             <button name="9" onClick={handleclick}>9</button>
             <button name="10" onClick={handleclick}>10</button>
             <button name="+" onClick={handleclick}>+</button>
             <button name="-" onClick={handleclick}>-</button>
             <button name="*" onClick={handleclick}>*</button>
             <button name="/" onClick={handleclick}>/</button>
             <button onClick={handleans}>=</button>

        </div>
       
    </div>);
}
 
export default Header;