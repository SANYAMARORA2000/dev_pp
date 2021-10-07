
import React, { useEffect, useState,useRef} from 'react';
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
const Header = (props) => {
     
    const inputEl=useRef("")
    const[time,settime]=useState()
    const[vehiclenum,setvehiclenum]=useState()
    const[vehicletype,setvehicletype]=useState()
    const[vehiclemodel,setvehiclemodel]=useState()
    const[phonenumer,setphonenumer]=useState()
    const[customername,setcustomername]=useState()
    const[obj,setobj]=useState({});
    const[arr,setarr]=useState(getlocalitems());
    const[modalisopen,setmodalisopen]=useState(false);
    const[modalisopen1,setmodalisopen1]=useState(false);
    const[searchterm,setsearchterm]=useState("");
    const[searchresult,setsearchresult]=useState([]);
    const[helparr,sethelparr]=useState([]);
    const[id,setid]=useState();
    const[cust,setcust]=useState("");
    const[vehnum,setvehnum]=useState("");
    const[vehtype,setvehtype]=useState("");
    const[vehmodel,setvehmodel]=useState("");
    const[num,setnum]=useState("");
    const[t,sett]=useState("");
    

   

    useEffect(()=>{
      localStorage.setItem('lists',JSON.stringify(arr));
    },[arr])

    const searchHandler=(searchterm)=>{
        setsearchterm(searchterm);
        console.log(searchterm);
        if(searchterm!=="")
        {
            const newlist1=arr.filter((obj)=>{
                return Object.values(obj).join("").toLowerCase().includes(searchterm.toLowerCase());
            })
            console.log(newlist1)
            setsearchresult(newlist1);
            console.log(searchresult)
        }
        else
        {
            setsearchresult(arr);
        }
       
       
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
        alert("Your car will reach the doorstep in the next 5 minutes");
       
        
      
        
    }
    let upd=[];
    const helper=(id)=>
    {
        setid(id);
        console.log(id);
    
        for(let i=0;i<arr.length;i++)
        {
            let obj1=arr[i]
            console.log(obj1.id)
            if(obj1.id==id)
            {
                setvehnum(obj1.vehiclenum);
                setvehtype(obj1.vehicletype);
                setvehmodel(obj1.vehiclemodel);
                setnum(obj1.phonenumer)
               setcust(obj1.customername);
               sett(obj1.time);
            }
        }
   
        console.log(upd);
      sethelparr(upd);
      console.log(helparr);   
      console.log("hello")
     
    }
    

    const handletask=()=>{
        console.log()
        
        let newobj={id:Date.now(),vehiclenum:vehiclenum,vehicletype:vehicletype,vehiclemodel:vehiclemodel,phonenumer:phonenumer,customername:customername,time:time}
        console.log(newobj);
        setobj(newobj)
        console.log(obj);
        let newarr=[...arr,newobj];
      
        console.log(searchterm.length)
        setarr(newarr);
        setarr(newarr);
        console.log(newarr);
        setvehiclenum("")
        setvehicletype("")
        setvehiclemodel("")
        setphonenumer("")
        setcustomername("")
     

    }
     const handlesearch=()=>
     {
        let newlist=[...arr];
    
        setarr(searchterm.length<1?newlist:searchresult);
    

        
     }
       
    return ( <div className="task-container">

         
           <input type="text" className="searchw"placeholder="Search"  value={searchterm} onChange={(e)=>{setsearchterm(e.target.value) 
           
        searchHandler(e.target.value)}} />
         <button className="searchw" onClick={handlesearch}>Get Search Result</button>
           
           <button className="searchw"  className="check-in" onClick={()=>{setmodalisopen(true)}}>+ Check In</button>
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
                     <input type="text" className="input-style" placeholder="time" value={time}  onChange={(e)=>{setcustomername(e.target.value)
                    }}/>
                    <button className="check-in" onClick={handletask}>+ Check-in</button>
                    </div>
                    <button className="check-in" onClick={()=>{setmodalisopen(false)}}>Close</button>
           </Modal>
          
            
       
             <div class="task-display">
                {
                   arr.map((taskObj)=>{
                    return <div className="task-div" key={taskObj.id}>
                     <table className="head">
                                  <tr className="head">
                                    <th className="heading-table">Vehicle No</th>
                                    <th className="heading-table">Vehicle Model</th>
                                    <th className="heading-table" >Vehicle Type</th>
                                    <th className="heading-table" >Phone</th>
                                    <th className="heading-table" >Check in</th>
                                  </tr>
                                  <tr className="head">
                                        <td>{taskObj.vehiclenum}</td>
                                        <td>{taskObj.vehicletype}</td>
                                        <td> {taskObj.vehiclemodel}</td>
                                        <td>{taskObj.phonenumer}</td>
                                        <td>{taskObj.customername}</td>
                                        <td>{taskObj.time}</td>
                                    </tr>
                                    <button  className="check-in" onClick={()=>{setmodalisopen1(true) 
                        helper(taskObj.id)}} >checkout</button>
                     </table>
                                
                       
                      
                             <Modal isOpen={modalisopen1} onRequestClose={()=>setmodalisopen1(false)}>
                                 {
                                      <table className="head">
                                      <tr className="head">
                                        <th className="heading-table">Vehicle No</th>
                                        <th className="heading-table">Vehicle Model</th>
                                        <th className="heading-table" >Vehicle Type</th>
                                        <th className="heading-table" >Phone</th>
                                        <th className="heading-table" >Check in</th>
                                      </tr>
                                      <tr className="head">
                                            <td>{vehnum}</td>
                                            <td>{vehtype}</td>
                                            <td>{vehmodel}</td>
                                            <td>{num}</td>
                                            <td>{cust}</td>
                                            <td>{t}</td>
                                        </tr>
                                        <button className="check-in" onClick={()=>handlecheckout(taskObj.id)}>checkout</button>
                                   </table>

                                    
                                 }
                            
                             </Modal>
                        
                        </div>;
                        
                        
                   })
                   
                
                }
              
               
                
                
           </div>
    </div>)
}
 
export default Header;