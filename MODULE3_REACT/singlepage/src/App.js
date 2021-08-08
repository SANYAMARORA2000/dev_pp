import React,{useContext,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Components/Header";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Feedwithoutlogin from './Components/Feedwithoutlogin';
import { AuthContext,AuthProvider } from './context/AuthProvider';



function App() {
  return (
    <AuthProvider>
    <Router>
       <div className="App">
       <Header></Header>
          <Switch>
          {/* <Route path="/feedw" component={Feedwithoutlogin} exact></Route> */}
          <Route path="/" component={Feeds} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/signup" component={Signup} exact></Route>
           
            <Route path="/profile" component={Profile} exact></Route>
          
          </Switch>
       </div>

        </Router>
    </AuthProvider>
    
     
    
   
  );
}
// function PrivateRoute(props) {
//   console.log(props);
  
//   let { comp: Component, path } = props;
//   // Feeds ?? loggedIn and path="/"
//   let { currentUser } = useContext(AuthContext);
//   // let currentUser = false;
//   return currentUser ? (
//     <Route path={path} component={Component}></Route>
//   ) : (
//     <Redirect to="/login"></Redirect>
//   );
// }


export default App;
