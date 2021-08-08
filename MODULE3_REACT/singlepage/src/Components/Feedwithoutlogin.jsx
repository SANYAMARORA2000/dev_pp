import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthProvider";
import {Button} from "@material-ui/core"
import MusicNote from "@material-ui/icons/MusicNote";
import { firebaseDB, firebaseStorage ,timeStamp} from "../config/firebase";
import { uuid } from 'uuidv4';
import AudioPost from './AudioPost';
const Feedwithoutlogin = (props) => {

    const{signOut}=useContext(AuthContext)
    
    const [posts,setPosts]=useState([]);
    
    
  
    
    
    
    let conditionObject = {
      root: null, //observe from whole page
      threshold: "0.8", //80%
    };
    function cb(entries) {
      console.log(entries);

      entries.forEach((entry) => {
        let child = entry.target.children[0];
        // play(); => async
        // pause(); => sync
  
        child.play().then(function () {
          if (entry.isIntersecting == false) {
            child.pause();
          }
        });
      });
    }
    useEffect(()=>{
      let observerObject = new IntersectionObserver(cb, conditionObject);
      let elements = document.querySelectorAll(".audio-container");

      elements.forEach((el) => {
          observerObject.observe(el); //Intersection Observer starts observing each video element
        });
  },[posts])//will use it as component didmount

    useEffect(()=>{
    //when you first come at feed bring all posts
    firebaseDB.collection("posts").orderBy("createdAt","desc")
    .onSnapshot((snapshot)=>{
      let allPosts=snapshot.docs.map( (doc)=>{
        return doc.data();
      });
      setPosts(allPosts);
    });
  },[]);
   

    return ( 
      
        <div className="uploadAudio" style={{backgroundColor:"lightgreen"}}>
         
        
                <div className="feed-audio-list">
                    {posts.map(postObj=>{
                      return <AudioPost key={postObj.pid} postObj={postObj}></AudioPost>
                    })}
              </div>
         </div>
         
         
     );
}
 
export default Feedwithoutlogin;