import React, { useState, useEffect } from 'react';


const Header = () => {

    const getdata=async()=>
    {
        try{
            const res= await fetch("https://data.covid19india.org/data.json");
            // console.log(res);
            const newdata=await res.json();
            console.log(newdata.statewise[0]);
        }
        catch(err)
        {
            console.log(err);
        }
      
    }

   useEffect(()=>{
       getdata();
   },[])
     
    return ( 
    <div>
        <h1>Live</h1>
        <h2>Tracker</h2>

        <ul>
             <li className="list">
                  <div className="list-main">
                        <div className="inner">
                            <p className="header">
                                <span>OUR COUNTRY</span>
                                <span>INDIA</span>
                            </p>
                        </div>
                  </div>
             </li>
        </ul>
    </div>

  
         
                 );
}
 
export default Header;