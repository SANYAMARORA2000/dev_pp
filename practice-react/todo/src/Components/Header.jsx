
import React, { useEffect, useState} from 'react';
import Modal from 'react-modal';
import "./Header.css"

Modal.setAppElement('#root');
const getlocalitems=()=>{
    let lists=localStorage.getItem('lists');
    console.log(lists);

    if(lists)
    {
     return JSON.parse(localStorage.getItem('lists'));
    }
    else
    {
        return [];
    }
}
const Header = () => {
  
    const[vehiclenum,setvehiclenum]=useState()
    const[vehicletype,setvehicletype]=useState()
    const[vehiclemodel,setvehiclemodel]=useState()
    const[phonenumer,setphonenumer]=useState()
    const[customername,setcustomername]=useState()
    const[obj,setobj]=useState({});
    const[arr,setarr]=useState(getlocalitems());
    const[modalisopen,setmodalisopen]=useState(false);
    const[modalisopen1,setmodalisopen1]=useState(false);
    const[searchterm,setsearchterm]=useState("")
    const[helparr,sethelparr]=useState([]);
   

    useEffect(()=>{
      localStorage.setItem('lists',JSON.stringify(arr));
    },[arr])
   
      
    const handledelete=(index)=>
    {
       var newlist=[...arr];
       newlist.splice(index,1);
       setarr(newlist);
    }

    const handlecheckout=(id)=>
    {
        
        console.log(id);
        console.log(arr)
        let updated=[];
        for(let i=0;i<arr.length;i++)
        {
            let obj1=arr[i]
          
            if(obj1.id!=id)
            {
                updated.push(obj1);
            }
        }
        console.log(updated)
        setarr(updated);
        
        
      
        
    }
    let upd=[];
    const helper=(id)=>
    {
        console.log(id);
     
        for(let i=0;i<arr.length;i++)
        {
            let obj1=arr[i]
            console.log(obj1.id)
            if(obj1.id==id)
            {
                upd.push(obj1);
            }
        }
   
        console.log(upd);
    //   sethelparr(upd);
    //   console.log(helparr);   
    //   console.log("hello")
     
    }
    

    const handletask=()=>{
        console.log()
        let newobj={id:Date.now(),vehiclenum:vehiclenum,vehicletype:vehicletype,vehiclemodel:vehiclemodel,phonenumer:phonenumer,customername:customername}
        console.log(newobj);
        setobj(newobj)
        console.log(obj);
        let newarr=[...arr,newobj];
        setarr(newarr);
        console.log(newarr);
        setvehiclenum("")
        setvehicletype("")
        setvehiclemodel("")
        setphonenumer("")
        setcustomername("")
     

    }

       
    return ( <div className="task-container">

         
           <input type="text" placeholder="Search" onChange={(e)=>{setsearchterm(e.target.value)}} />
           
           <button onClick={()=>{setmodalisopen(true)}}>checkin</button>
           <Modal isOpen={modalisopen} onRequestClose={()=>setmodalisopen(false)}>
           <div class="task-input">

                    <input type="text" className="input-style" placeholder="vehicleNumber" value={vehiclenum}  onChange={(e)=>{setvehiclenum(e.target.value)
                    }}/>
                    <input type="text" className="input-style" placeholder="vehicleType" value={vehicletype}  onChange={(e)=>{setvehicletype(e.target.value)
                    }}/>
                    <input type="text" className="input-style" placeholder="vehicleModel" value={vehiclemodel}  onChange={(e)=>{setvehiclemodel(e.target.value)
                    }}/>
                    <input type="text" className="input-style" placeholder="phoneNumber" value={phonenumer}  onChange={(e)=>{setphonenumer(e.target.value)
                    }}/>
                    <input type="text" className="input-style" placeholder="customername" value={customername}  onChange={(e)=>{setcustomername(e.target.value)
                    }}/>
                    <button onClick={handletask}>checkin</button>
                    </div>
                    <button onClick={()=>{setmodalisopen(false)}}>close</button>
           </Modal>
          
            
       
             <div class="task-display">
                {
                   arr.map((taskObj)=>{
                    return <div className="task-div" key={taskObj.id}>
                        {taskObj.vehiclenum} 
                        {taskObj.vehicletype}
                        {taskObj.vehiclemodel}
                        {taskObj.phonenumer}
                        {taskObj.customername}
                        <button  onClick={()=>{setmodalisopen1(true) 
                        helper(taskObj.id)}} >checkout</button>
                             <Modal isOpen={modalisopen1} onRequestClose={()=>setmodalisopen1(false)}>
                                 {
                                     console.log(upd)
                                 }
                             {/* <p>{upd[0].id}</p> */}
                             <button onClick={()=>handlecheckout(taskObj.id)}>checkout</button>
                             </Modal>
                        
                        </div>;
                        
                   })
                }
           </div>
    </div>)
}
 
export default Header;