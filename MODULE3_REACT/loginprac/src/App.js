import React,{useContext,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch, Redirect} from "react-router-dom"
import Header from "./Components/Header";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import { AuthContext, AuthProvider } from "./context/AuthProvider";


function App() {
  return (
     <AuthProvider>
         <Router>
          <div className="App">
           <Header></Header>
          <Switch>
           
               <Route path="/login" component={Login} exact></Route>
               <Route path="/profile" component={Profile} exact></Route>
               <PrivateRoute path="/signup" component={SignUp} exact></PrivateRoute>
               <PrivateRoute path="/" component={Feeds} exact></PrivateRoute>
               
              
          </Switch>
          </div>
      </Router>
      
     </AuthProvider>
      
    
  );
}

function PrivateRoute(props)
{
  let {comp:Component,path}=props;
  let {currentUser}=useContext(AuthContext)
  return currentUser ? (
    <Route path={path} component={Component}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );

}

export default App;
