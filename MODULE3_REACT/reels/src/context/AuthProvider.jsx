
import React, { useState, useEffect } from 'react';

import { firebaseAuth} from "../config/firebase";

export const AuthContext=React.createContext();//wiwth the help of this context can be used everywhere


export function AuthProvider({children}){
    const[currentUser,setCurrentUser]=useState(null);


    function login(email,password)
    {
        return firebaseAuth.signInWithEmailandPassword(email,password);
    }
    function signOut()
    {
        return firebaseAuth.signOut();
    }

    function signUp(email,password)
    {
        // return  firebaseAuth.signUp(email , password);
    }

    useEffect(()=>{
        //event attach kar diya
        //logged in se logged out wale state change main yeh call hoga and vice versa
        firebaseAuth.onAuthStateChanged((user)=>{
            console.log("inside auth state changed",user);
            setCurrentUser(user);//jo ab user mila hai vo set kardiya
        });
    },[]);

    let value={
        currentUser:currentUser,
        signOut:signOut,
        login:login,
        signUp:signUp,
    };

    return <AuthContext.Provider value={value}>
          {children}
    </AuthContext.Provider>
}

