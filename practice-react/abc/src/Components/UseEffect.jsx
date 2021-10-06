
import React, { useState } from 'react';


const UseEffect = () => {

    const[task,settask]=useState();
    const[list,setlist]=useState([]);

    const handletask=()=>{
       let newlist=[...list,{id:Date.now(),task:task}];
       setlist(newlist);
       settask("");


    }

    return ( <div class="task-container">
        <div class="task-input">
            <input type="text" value={task} onChange={(e)=>{
                settask(e.target.value);
            }}/>
            <button onClick={handletask}>ADD</button>
        </div>
        <div class="task-display">
             {
                 list.map((taskobj)=>{
                     return <div class="task-div" key={taskobj.id}>{taskobj.task}</div>
                 })
             }
        </div>
    </div>);
}
 
export default UseEffect;