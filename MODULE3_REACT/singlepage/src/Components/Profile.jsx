import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthProvider";
import {Button} from "@material-ui/core"
import { firebaseDB, firebaseStorage ,timeStamp} from "../config/firebase";
import AudioPost from './AudioPost';
const Profile = (props) => {
    const{signOut}=useContext(AuthContext)
   
    const [posts,setPosts]=useState([]);
    const {currentUser}=useContext(AuthContext);
    
    const handleLogout = async ()=>{
        try
        {
            await signOut();
             props.history.push("/login");
        }
        catch(err)
        {
            console.log(err)
        }

    }
   
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
        console.log(currentUser.uid);
        firebaseDB.collection("posts").orderBy("createdAt","desc")
        .onSnapshot((snapshot)=>{
          let allPosts=snapshot.docs.map( (doc)=>{
            return doc.data();
          });
          console.log(allPosts);
          let filteredobj=[];
          {allPosts.map(postObj=>{
              if(postObj.uid==currentUser.uid)
              {
                filteredobj.push(postObj);
              }
          
          })}
          
          console.log(filteredobj);
          
          
          setPosts(filteredobj);
         
        });
      },[]);

      console.log(posts)
    return ( 
        <div className="uploadAudio" style={{backgroundColor:"lightgreen"}}>
         
         <Button variant="contained" color="secondary" size="small"onClick={handleLogout}>LOG OUT</Button>
         
          <div className="feed-audio-list">
           {posts.map(postObj=>{
             return <AudioPost key={postObj.pid} postObj={postObj}></AudioPost>
           })}
         </div>
        </div>
         
         
     );
}
 
export default Profile;