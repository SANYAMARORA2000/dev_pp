import React, { useState, useEffect } from 'react';



const Header = () => {
    const[list,setlist]=useState([]);
    const[task,settask]=useState();

    const handleinput=()=>{
        let newlist=[...list,{id:Date.now(),task:task}]
        setlist(newlist);
        settask("");
    }

    return ( <div class="task-container">
        <div class="task-input">
            <input type="text" value={task} onChange={(e)=>{
                settask(e.target.value);
            }}/>
            <button onClick={handleinput}>ADD</button>
        </div>
        <div class="task-output">
               {
                   list.map((obj)=>{
                       return <div class="task" key={obj.id}>{obj.task}</div>
                   })
               }
        </div>

    </div> );
}
 
export default Header;