import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Favourites from '../Favourites/Favourites';

const Homepage = (props) => {
    const [selectlist,setselectlist] = useState([]);
    let handleclick = (e)=>{
        let arr = [...selectlist, e.target.value];
        setselectlist(arr);
        console.log(selectlist);
    }

    let gotofavourites = ()=>{
        props.adduser(selectlist);
    }

    return ( 
        <div style={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <label htmlFor="high">high</label>
            <input type="checkbox" value="high" onChange={(e)=>handleclick(e)}></input>
            <label htmlFor="cruel">cruel</label>
            <input value="cruel" onChange={(e)=>handleclick(e)} type="checkbox"></input>
            
            <label htmlFor="nappy">nappy</label>
            <input type="checkbox" value="nappy" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="sable">sable</label>
            <input type="checkbox" value="sable" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="mine">mine</label>
            <input type="checkbox" value="mine" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="vagabond">vagabond</label>
            <input type="checkbox" value="vagabond" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="sassy">sassy</label>
            <input type="checkbox" value="sassy" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="steer">steer</label>
            <input type="checkbox" value="steer" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="argument">argument</label>
            <input type="checkbox" value="argument" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="unaccountable">unaccountable</label>
            <input type="checkbox" value="unaccountable" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="steer">steer</label>
            <input type="checkbox" value="steer" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="tie">tie</label>
            <input type="checkbox" value="tie" onChange={(e)=>handleclick(e)}></input>

            <label htmlFor="middle">middle</label>
            <input type="checkbox" value="middle" onChange={(e)=>handleclick(e)}></input>

            <button onClick={gotofavourites}>
                <Link to="/favourites">
                    Favouraites Page
                </Link>
            </button>
        </div>
     );
}
 
export default Homepage;