import React, { useState } from 'react';


const Header = () => {

    const[task,settask]=useState()
    const[list,setlist]=useState([]);

    const handlesubmit=()=>
    {
      const newlist=[...list,{id:Date.now(),task:task}];
      setlist(newlist);
      settask("");
    }
    return ( <div class="todo">
         <div class="input">
            <input type="text" value={task}  onChange={(e)=>{settask(e.target.value)}}></input>
            <button onClick={handlesubmit}>ADD</button>
         </div>
         <div class="output">
            {
                list.map((obj)=>{
                    return <div id={obj.id}>{obj.task}</div>
                })
            }
         </div>
    </div> );
}
 
export default Header;