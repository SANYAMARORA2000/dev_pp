import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthProvider";
import {Button} from "@material-ui/core"
import MusicNote from "@material-ui/icons/MusicNote";
import { firebaseDB, firebaseStorage ,timeStamp} from "../config/firebase";
import { uuid } from 'uuidv4';
import AudioPost from './AudioPost';
const Feeds = (props) => {
    const{signOut}=useContext(AuthContext)
    const [musicFile,setMusicFile]=useState(null);
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
    const handleInputFile=(e)=>
    {
        let file=e.target.files[0];
        setMusicFile(file);
    }
    const handleUploadFile=async ()=>
    {
        try{
            let uid= currentUser.uid;
            const uploadMusicObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/${Date.now()}.mp3`)
        .put(musicFile);
      //   console.log(uploadPhotoObject);
      uploadMusicObject.on("state_changed", fun1, fun2, fun3);
      // to track the progress of the upload
      function fun1(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      // if indicates a error !!
      function fun2(error) {
        console.log(error);
      }
      // it indicates success of the upload !!
      async function fun3() {
        let musicUrl =await uploadMusicObject.snapshot.ref.getDownloadURL();
        console.log(musicUrl);
        // db me collection => document => {username , email , profileImageUrl};
        let pid=uuid();//unique id for each post
        await firebaseDB.collection("posts").doc(pid).set({
          pid:pid,
          uid:uid,
          comments:[],
          likes:[],
          audioLink:musicUrl,
          createdAt:timeStamp()
        });
        let doc = await firebaseDB.collection("users").doc(uid).get();
          let document =doc.data();
          document.postsCreated.push(pid);
          await firebaseDB.collection("users").doc(uid).set(document);
      }
        }
        catch(err)
        {

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
    firebaseDB.collection("posts").orderBy("createdAt","desc")
    .onSnapshot((snapshot)=>{
      let allPosts=snapshot.docs.map( (doc)=>{
        return doc.data();
      });
      setPosts(allPosts);
    });
  },[]);
   

    return ( 
         
       currentUser?
        <div className="uploadAudio" style={{backgroundColor:"lightgreen",}}>
         
        
         <div >
              <div>
                  <input  type="file"  onChange={handleInputFile}/>
                  <label>
                      <Button onClick={handleUploadFile} variant="contained" color="secondary" startIcon={<MusicNote></MusicNote>}>UPLOAD</Button>
                  </label>
              </div>
          </div>
                <div className="feed-audio-list">
                {posts.map(postObj=>{
                  return <AudioPost key={postObj.pid} postObj={postObj}></AudioPost>
                })}
              </div>
              <Button variant="contained" color="secondary" size="small"onClick={handleLogout}>LOG OUT</Button>
        </div> :

         <div className="uploadAudio" style={{backgroundColor:"lightgreen" , 
         backgroundImage: "url(" + "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80" + ")",
         backgroundPosition: 'center',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat'}}>
         
        
         <div >
              
          </div>
                <div className="feed-audio-list">
                {posts.map(postObj=>{
                  return <AudioPost key={postObj.pid} postObj={postObj}></AudioPost>
                })}
              </div>
             
        </div> 


         
         
     );
}
 
export default Feeds;