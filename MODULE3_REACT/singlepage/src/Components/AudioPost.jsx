import React, { useContext, useEffect, useState } from 'react';
import { firebaseDB ,timeStamp} from '../config/firebase';
import  ReactDOM  from 'react-dom';
import {makeStyles,Card,CardActions,CardHeader,Button,CardMedia,TextField,Avatar, Typography,Container} from "@material-ui/core";
import { AuthContext } from '../context/AuthProvider';
import {Favorite,FavoriteBorder} from '@material-ui/icons';

const AudioPost = (props) => 
{

  let [user,setUser]=useState(null);
  let [comment,setComment]=useState("");
 let [commentList,setCommentList]=useState([]);
 let [likesCount,setLikesCount]=useState(null);
 let [isLiked,setIsLiked]=useState(false);
 let {currentUser}=useContext(AuthContext);

 const addCommentToCommentList=async(e)=>{
    let profilePic;
    //when commenting and post user is same
    if(currentUser.uid==user.userId)
    {
      profilePic=user.profileImageUrl;
    }
    else
    {
      let doc=await firebaseDB.collection("users").doc(currentUser.uid).get();
      let user=doc.data();
      profilePic=user.profileImageUrl;
    }
  let newCommentList=[...commentList,{profilePic:profilePic ,comment:comment}];

  let postObject=props.postObj;
  postObject.comments.push({uid:currentUser.uid,comment:comment});

  await firebaseDB.collection("posts").doc(postObject.pid).set(postObject);

  setCommentList(newCommentList);
  setComment("");
 }
 const toggleLikeIcon=async()=>{
   if(isLiked)
  {
    let postDoc=props.postObj;
    let filteredlikes=postDoc.likes.filter(uid=>{
      if(uid==currentUser.uid)
      {
         return false;
      }
      else
      {
        return true;
      }

    }) 
    postDoc.likes=filteredlikes;
    await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
    setIsLiked(false);
    likesCount==1 ? setLikesCount(null) : setLikesCount(likesCount-1);

  }
  else
  {
    let postDoc=props.postObj;
   
    postDoc.likes.push(currentUser.uid);
    await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
    setIsLiked(true);
    likesCount==null ? setLikesCount(1) : setLikesCount(likesCount+1);

  }


 }

     useEffect( async() => 
     {
       console.log(props);
      let uid=props.postObj.uid;
      
      let doc=await firebaseDB.collection("users").doc(uid).get();
      let user=doc.data();
      let commentList=props.postObj.comments;
      let likes=props.postObj.likes;
      let updatedCommentList=[];
      for(let i=0;i<commentList.length;i++)
      {
             let commentObj=commentList[i];
             let doc=  await firebaseDB.collection("users").doc(commentObj.uid).get();
             let commentUserPic=doc.data().profileImageUrl;
             updatedCommentList.push({profilePic:commentUserPic ,comment:commentObj.comment});
      }
       if(likes.includes(currentUser.uid))
       {
         setIsLiked(true);
         setLikesCount(likes.length);
       }
       else
       {
         if(likes.length)
         {
          setLikesCount(likes.length);
         }
       
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
             <Card style={{height:"650px" ,width:"345px" ,margin:"auto",padding:"10px",marginBottom:"10px"}}>
                <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
                <Typography variant="span">{user ?user.username : ""} </Typography> 
                <div className="audio-container">
                <Audio src={props.postObj.audioLink} ></Audio>
                </div>
               {isLiked ? <Favorite onClick={()=>toggleLikeIcon()} style={{color:"red"}}></Favorite> : <FavoriteBorder  onClick={()=>toggleLikeIcon()}></FavoriteBorder>}


                {likesCount && 
                <div>
                   <Typography variant="p">Liked By {likesCount} others</Typography>
                </div>
               }
            
                <Typography variant="p">Comments</Typography>
                <TextField variant="outlined" label="Add a comment" size="small" value={comment} onChange={(e)=>{setComment(e.target.value)}}></TextField>
                <Button variant="contained" color="secondary" onClick={addCommentToCommentList}>Post</Button>

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
  const handleAutoScroll=(e)=>{
    console.log(e);
    let next=ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode.nextSibling;
    console.log(next);
    if(next){
      next.scrollIntoView({behaviour:"smooth"});
      e.target.muted="true";
    }

  }
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

         className="audio-styles" controls muted={false} onEnded={handleAutoScroll}   onClick={(e)=>{console.log(timeStamp())}}>
        <source src={props.src} type="audio/mp3"></source>
      </audio>
    );
  }
 
export default AudioPost;