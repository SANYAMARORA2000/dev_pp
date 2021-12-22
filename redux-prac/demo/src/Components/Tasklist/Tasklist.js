import React from 'react';
import './Tasklist.css'
import { Alert } from 'antd';
import Taskdisplay from '../Taskdisplay/Taskdisplay';

const Tasklist = ({setinfoobj}) => {
     
     const obj={name:"hello",password:"hii"}
    const SendProps=(obj)=>{
        
        setinfoobj(obj);
    //   <Taskdisplay credentials={credentials}/>
    }
    return (<div>
         <div>
           <div class="task-div" onClick={(e)=>SendProps(obj)}>
               
                  <div class="frame1">
                      <p class="frame1p">Submit error</p>
                  <Alert class="frame1alert" type="error" />
                  </div>
                  <div class="frame2">
                      <p class="frame2p">11:00 AM</p>
                      <p class="frame2p1">Monday, 7 April 2021 </p>
                  </div>
           </div>
           <div class="task-div">
                  <div class="frame1">
                      <p class="frame1p">Submit error</p>
                  <Alert class="frame1alert" type="error" />
                  </div>
                  <div class="frame2">
                      <p class="frame2p">11:00 AM</p>
                      <p class="frame2p1">Monday, 7 April 2021 </p>
                  </div>
           </div>
           <div class="task-div">
                  <div class="frame1">
                      <p class="frame1p">Submit error</p>
                  <Alert class="frame1alert" type="error" />
                  </div>
                  <div class="frame2">
                      <p class="frame2p">11:00 AM</p>
                      <p class="frame2p1">Monday, 7 April 2021 </p>
                  </div>
           </div>
         
           
        </div>
    </div> );
}
 
export default Tasklist;