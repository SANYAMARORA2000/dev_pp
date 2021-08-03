import React, { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthProvider";
import {Button} from "@material-ui/core"
import MusicNote from "@material-ui/icons/MusicNote"
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { uuid } from 'uuidv4';
const Feeds = (props) => {
    const{signOut}=useContext(AuthContext)
    const [musicFile,setMusicFile]=useState(null);
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
          audioLink:musicUrl
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
    return ( 
        <div>
         <h1>Feeds</h1>
         <button onClick={handleLogout}>LOG OUT</button>
         <div>
             <input type="file"  onChange={handleInputFile}/>
            <label>
                <Button onClick={handleUploadFile} variant="contained" color="secondary" startIcon={<MusicNote></MusicNote>}>UPLOAD</Button>
            </label>
         </div>
        </div>
     );
}
 
export default Feeds;