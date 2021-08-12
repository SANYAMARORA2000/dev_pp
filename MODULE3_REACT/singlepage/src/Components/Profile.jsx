import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthProvider";
import {Button,Typography,Avatar,makeStyles} from "@material-ui/core"
import { firebaseDB, firebaseStorage ,timeStamp} from "../config/firebase";
import AudioPost from './AudioPost';

const Profile = (props) => {
  const useStyles = makeStyles({
    
    backgroundpic:
    {
       height:"100rem",
       backgroundImage: "url(" + "https://www.dudleynews.co.uk/resources/images/3051716/" + ")",
      backgroundSize: 'cover'
    },
    headingdiv:
    {
      display:"flex",
      justifyContent:"space-between"
    }

  })
  let classes = useStyles();

    const{signOut}=useContext(AuthContext)
   
    const [posts,setPosts]=useState([]);
    let [user,setUser]=useState(null);
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

   
  

   
    useEffect(async ()=>{
        //when you first come at feed bring all posts
       
        if(currentUser)
        {
          let doc=await firebaseDB.collection("users").doc(currentUser.uid).get();
          let user=doc.data();
          firebaseDB.collection("posts").orderBy("createdAt","desc")
          .onSnapshot((snapshot)=>{
            let allPosts=snapshot.docs.map( (doc)=>{
              return doc.data();
            });
            console.log(allPosts);
            let filteredobj=[];
            allPosts.map(postObj=>{
                if(postObj.uid==currentUser.uid)
                {
                  filteredobj.push(postObj);
                }
            
            })
            
            console.log(filteredobj);
            
            
            setPosts(filteredobj);
            setUser(user);
           
          });
        }
        else
        {
          return;
        }
       
      });

      console.log(posts)
    return ( 
        <div className="uploadAudio" className={classes.backgroundpic}>
         
        <div className={classes.headingdiv}>
              <div>
              <Avatar style={{marginRight:"5px",marginBottom:"6px"}} src={user ? user.profileImageUrl : ""}></Avatar>
              <Typography style={{ color:"black"}}variant="h5">{user ?user.username : ""} </Typography> 
              </div>
              <Button style={{height:"6vh"}}variant="contained" color="secondary" size="small"onClick={handleLogout}>LOG OUT</Button>
        </div>
          <div className="feed-audio-list">
           {posts.map(postObj=>{
             return <AudioPost key={postObj.pid} postObj={postObj}></AudioPost>
           })}
         </div>
        </div>
         
         
     );
}
 
export default Profile;