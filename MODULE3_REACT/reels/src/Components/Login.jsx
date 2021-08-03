import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import {TextField,Grid,Button,Paper,Card,CardContent,CardActions,Container,CardMedia,Typography,makeStyles} from '@material-ui/core'

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

  return (
    <div>
      <Container>
        <Grid container spacing={2}> 
        <Grid item>
           <Paper>Carousel</Paper>
        </Grid>
        <Grid>
          
        </Grid>

        </Grid>
      </Container>
    {/* <h1>Login Page</h1>
      <div>
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
      </div>
      <button onClick={handleLogin}>Login</button>
      <h2 style={{ color: "red" }}>{message}</h2>{" "} */}
    </div>
  );
};

export default Login;