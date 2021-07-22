import React, { useEffect, useState } from 'react';

const UseEffect = () => {
    
    const[task,setTask]=useState("");
    const[taskList,setTaskList]=useState([]);


    const handleAddtTask=()=>{
        let newTaskList=[...taskList,{id:Date.now(),task:task}];//abhi tak ki tasklist aa gyi
        setTaskList(newTaskList);
        setTask("");
    }

    // useEffect(()=>{
    //     console.log("I will execute after every render");
    // });

    useEffect(()=>{
        console.log("I will execute after when task list updates");

        return function(){
            console.log("I am a cleanup function");
        }
    },[taskList]);

    return <div className="tasks-container">
        <div className="task-input">
            <input type="text" value={task} onChange={(e)=>{setTask(e.target.value)}}/>
            <button onClick={handleAddtTask}>Add Task</button>
        </div>
        <div className="task-list">
             {taskList.map(taskObj=>{
                 return <div key={taskObj.id}>
                     {taskObj.task}
                 </div>
             })}
        </div>

    </div>;
}
 
export default UseEffect;