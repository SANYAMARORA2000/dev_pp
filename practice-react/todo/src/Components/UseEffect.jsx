
import React, { useState} from 'react';



const UseEffect = () => {
    const[task,settask]=useState()
    const [list,setlist]=useState([]);

    const handletask=()=>{
        let newtasklist=[...list,{id:Date.now(),task:task}];
        setlist(newtasklist);
        settask("");
    }

       
    return ( <div class="task-container">
           
           <div class="task-input">
                <input type="text" value={task}  onChange={(e)=>{settask(e.target.value)
                }}/>
                <button onClick={handletask}>ADD task</button>
           </div>
           <div class="task-display">
               {
                   list.map((taskObj)=>{
                    return <div className="task-div" key={taskObj.id}>{taskObj.task}</div>;
                   })
               }
           </div>
    </div>);
}
 
export default UseEffect;