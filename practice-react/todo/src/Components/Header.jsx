
import React, { useEffect, useState} from 'react';
import Modal from 'react-modal';


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
          
            if(obj1.newobj.id!=id)
            {
                updated.push(obj1);
            }
        }
        console.log(updated)
        setarr(updated);
        
        
      
        
    }
    

    const handletask=()=>{
        console.log()
        let newobj={id:Date.now(),vehiclenum:vehiclenum,vehicletype:vehicletype,vehiclemodel:vehiclemodel,phonenumer:phonenumer,customername:customername}
        console.log(newobj);
        setobj(newobj)
        let newarr=[...arr,{newobj:newobj}];
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

                    <input type="text" placeholder="vehicleNumber" value={vehiclenum}  onChange={(e)=>{setvehiclenum(e.target.value)
                    }}/>
                    <input type="text" placeholder="vehicleType" value={vehicletype}  onChange={(e)=>{setvehicletype(e.target.value)
                    }}/>
                    <input type="text" placeholder="vehicleModel" value={vehiclemodel}  onChange={(e)=>{setvehiclemodel(e.target.value)
                    }}/>
                    <input type="text" placeholder="phoneNumber" value={phonenumer}  onChange={(e)=>{setphonenumer(e.target.value)
                    }}/>
                    <input type="text" placeholder="customername" value={customername}  onChange={(e)=>{setcustomername(e.target.value)
                    }}/>
                    <button onClick={handletask}>checkin</button>
                    </div>
                    <button onClick={()=>{setmodalisopen(false)}}>close</button>
           </Modal>
          
            
           {/* <div class="task-input">

                <input type="text" placeholder="vehicleNumber" value={vehiclenum}  onChange={(e)=>{setvehiclenum(e.target.value)
                }}/>
                  <input type="text" placeholder="vehicleType" value={vehicletype}  onChange={(e)=>{setvehicletype(e.target.value)
                }}/>
                <input type="text" placeholder="vehicleModel" value={vehiclemodel}  onChange={(e)=>{setvehiclemodel(e.target.value)
                }}/>
                  <input type="text" placeholder="phoneNumber" value={phonenumer}  onChange={(e)=>{setphonenumer(e.target.value)
                }}/>
                 <input type="text" placeholder="customername" value={customername}  onChange={(e)=>{setcustomername(e.target.value)
                }}/>
               <button onClick={handletask}>checkin</button>
           </div> */}
             <div class="task-display">
                {
                   arr.map((taskObj)=>{
                    return <div className="task-div" key={taskObj.newobj.id}>
                        {taskObj.newobj.vehiclenum} 
                        {taskObj.newobj.vehicletype}
                        {taskObj.newobj.vehiclemodel}
                        {taskObj.newobj.phonenumer}
                        {taskObj.newobj.customername}
                        <button  onClick={()=>{handlecheckout(taskObj.newobj.id) }} >checkout</button>
                        
                        </div>;
                        
                   })
                }
           </div>
    </div>)
}
 
export default Header;