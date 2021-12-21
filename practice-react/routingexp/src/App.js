import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";




function App() {
  return (
    
    <Router>
       <div className="App">
      
          <Routes>
   
          <Route path="/" element={<Home name="rajesh"/>} exact ></Route>
          <Route path="/about" element={<About/>} exact></Route>
           
          
          </Routes>
       </div>

        </Router>

    
     
    
   
  );
}



export default App;
