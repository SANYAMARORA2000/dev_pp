import React, { useState, useEffect } from 'react';
import axios from "axios";

export const NewsContext=React.createContext()//context ban gaya

export const NewsContextProvider = (props) => {
    const[data,SetData]=useState();
    const apiKey = "020f128a50e643a999ec52547b17b9de";
    useEffect(()=>{
       
        axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`).then((response)=>SetData(response.data)).catch((error) => console.log(error));
    },[])
    
    

    
    return( <NewsContext.Provider value={{data}}>
       {props.children}
    </NewsContext.Provider>);
}
 
export default NewsContextProvider;