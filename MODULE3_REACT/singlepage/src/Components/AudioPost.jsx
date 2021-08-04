import React, { useEffect, useState } from 'react';
import { firebaseDB } from '../config/firebase';
import {makeStyles,Card,CardActions,CardHeader,Button,CardMedia,TextField,Avatar, Typography,Container} from "@material-ui/core";

const AudioPost = (props) => 
{

  let [user,setUser]=useState(null);
  let [comment,setComment]=useState("");
 let [commentList,setCommentList]=useState([]);

     useEffect( async() => 
     {
       console.log(props);
      let uid=props.postObj.uid;
      
      let doc=await firebaseDB.collection("users").doc(uid).get();
      let user=doc.data();
      let commentList=props.postObj.comments;
      let updatedCommentList=[];
      for(let i=0;i<commentList.length;i++)
      {
             let commentObj=commentList[i];
             let doc=  await firebaseDB.collection("users").doc(commentObj.uid).get();
             let commentUserPic=doc.data().profileImageUrl;
             updatedCommentList.push({profilePic:commentUserPic ,comment:commentObj.comment});
      }
      // let updatedCommentList=commentList.map(async(commentObj)=>{
      //   let doc=  await firebaseDB.collection("users").doc(commentObj.uid).get();
      //   let commentUserPic=doc.data().profileImageUrl;
      //   return {profilePic:commentUserPic ,comment:commentObj.comment};
      // });

      setUser(user);
      setCommentList(updatedCommentList);
      // .then((doc)=>{
      //   let user=doc.data();//get user who created that post
      //   setUser(user);
      //   setCommentList(props.postObj.comments)
      // })
     },[]);



    return ( 
      
      
       <Container>
             <Card style={{height:"650px" ,width:"345px"}}>
                <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
                <Typography variant="span">{user ?user.username : ""} </Typography> 
                <div className="audio-container">
                <Audio src={props.postObj.audioLink} ></Audio>
                </div>
                <Typography variant="p">Comments</Typography>
                <TextField variant="outlined" label="Add a comment" size="small"></TextField>
                <Button variant="contained" color="secondary">Post</Button>

                 { commentList.map(commentObj=>{
                 return (
                   <>
                  <Avatar src={commentObj.profilePic}></Avatar>
                  <Typography variant="p" >{commentObj.comment}</Typography>
                  </>
                 )

                  // <Avatar src={commentObj.profilePic }></Avatar>
                  
                          
                
                 
                })}
                
            </Card>
       </Container> 
      
    
      
    );
 
};


function Audio(props) {
  
    return (
      <audio
       style={{ 
        height: "45vh",
        margin: "1rem",
        // border: "1px solid black",
        backgroundColor:"red",
        backgroundImage: "url(" + "https://i.pinimg.com/originals/05/4a/a3/054aa3421c22e0c9e04ada3082066a8d.gif" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }} 
    className="audio-styles" controls muted={false} id={props.id}>
        <source src={props.src} type="audio/mp3"></source>
      </audio>
    );
  }
 
export default AudioPost;