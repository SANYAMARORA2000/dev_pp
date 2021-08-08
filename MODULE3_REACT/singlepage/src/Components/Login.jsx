import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

import {TextField,Grid,Button,Paper,Card,CardContent,CardActions,CardMedia,Container,makeStyles, Typography} from '@material-ui/core';
import {Link, link} from "react-router-dom";
// import logo from  "../logo.jpg";
import logo from  "../abc.png";

import enjoymusic from  "../enjoymusic.jpg";
import a from  "../a.gif";

import { height } from "@material-ui/system";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("");
  let {login} = useContext(AuthContext);

  const handleLogin = async (e)=>{
    //   email , password
    try{
        await login(email , password);//as login was a promisified function so we use await
        props.history.push("/"); //navigate to /
    }
    catch(err){
        setMessage(err.message);
        setEmail("")
        setPassword("");
    }

  }
  let useStyles=makeStyles({
     
    centerDivs:{
       height:"100vh",
       display:"flex",
       justifyContent:"center",
       width:"100vw"

    },
    music:
    {
      backgroundSize:"contain",
      height:"25rem" ,
      
      
    },
    fullWidth:{
     
      width:"100%"
    },
    centerElements:{
      display:"flex",
      flexDirection:"column",
      
    },
    mb:{
      marginBottom:"1rem"
    },
    padding:{
      paddingTop:"1rem",
      paddingBottom:"1rem",
    },
    alignCenter:{
      justifyContent:"center"
    },
    color:
    {
      background:"#ff7f50",
      height:"100vh",
    
    },
    cont:
    {
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      marginTop:"10vh",
      marginLeft:"5vw",
      
  
    }

  })
let classes=useStyles();
  return (
    <div className={classes.color} >
   
      <Container >
        <Grid container spacing={2} >
             <Grid item sm={5} className={classes.cont}>
                   {/* <Paper image={logo} className={classes.ab}></Paper> */}
                   <CardMedia image={a} className={classes.music}></CardMedia>
             </Grid>
              <Grid  item sm={4} className={classes.cont}>
                {/* login form */}
                <Card variant="outlined" className={classes.mb}>
                <CardMedia image={logo} style={{height:"10vh" ,backgroundSize:"contain" ,padding:"5px"}}></CardMedia>
                <CardContent className={classes.centerElements}>
                  <TextField  label="Email" type="email" variant="outlined" value={email} className={classes.mb} size="small"  onChange={(e) => setEmail(e.target.value)}></TextField>
                  <TextField  label="Password" type="password" variant="outlined" value={password} size="small"   onChange={(e) => setPassword(e.target.value)}></TextField>
                </CardContent>
                <CardActions>
                <Button variant="contained" color="primary" onClick={handleLogin} className={classes.fullWidth}>LOGIN</Button>
                
                </CardActions>
                <Typography style={{ color: "red" ,textAlign:"center"}}>{message}</Typography>
                
                </Card>
                <Card variant="outlined" className={classes.padding}>
                   <Typography style={{textAlign:"center"}}>
                     Don't have an account ? 
                     <Button variant="contained" color="primary">
                     <Link style={{color:"white"}}to="/signup">SignUp</Link>
                     </Button>
                     
                   </Typography>
                </Card>
              </Grid>
        </Grid>
      </Container>
    {/* <h1>Login Page</h1>
      
        <div>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      
      <button onClick={handleLogin}>Login</button>
      <h2 style={{ color: "red" }}>{message}</h2>{" "} */}
    </div>
  );
};

export default Login;