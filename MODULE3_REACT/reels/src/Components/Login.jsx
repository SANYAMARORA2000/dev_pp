import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Login = (props) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    let {login}=useContext(AuthContext);

    const handleLogin=async (e)=>{
        //email,password
        try{
            await login(email,password);
           props.history.push("/");
        }
        catch(err){
            //agar login nahi hua to login wale boxes empty set kar dega
            setMessage(err.message);
            setEmail("");
            setPassword("");
        }
     
    }
    return (  
     <>
     <h1>LOGIN PAGE</h1>
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
    <h2 style={{ color: "red" }}>{message}</h2>{" "}
    
    </> 
    );
}
 
export default Login;