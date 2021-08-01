import React, { useState } from 'react';

const UseEffect = () => {
    const[task,SetTask]=useState("");
    const[list,setList]=useState([]);

    const handletask=()=>{
        let newtasklist=[...list,{id:Date.now(),task:task}];
        setList(newtasklist);
        SetTask("");
    }

    return ( <div className="Task-container">

        <div className="task-input">
               <input className="input-space" type="text" value={task} onChange={(e)=>{
                      SetTask(e.target.value);
               }}/>
               <button className="add-button" onClick={handletask}>ADD TASK</button>
        </div>
        <div className="task-displayer">
               {
                   list.map((taskObj)=>{
                       return <div className="task-div" key={taskObj.id}>{taskObj.task}</div>;
                   })
               }
        </div>
    </div> );
}
 
export default UseEffect;