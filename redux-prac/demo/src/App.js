import { useState } from "react";
import Demoprac from "./Components/Demoprac/Demo"
import Taskdisplay from "./Components/Taskdisplay/Taskdisplay";
import Tasklist from "./Components/Tasklist/Tasklist";
function App() {
  const[infoobj,setinfoobj]=useState({});
  return (
    <div className="App">
        <Demoprac></Demoprac>
       <Tasklist setinfoobj={setinfoobj}></Tasklist>
       <Taskdisplay infoobj={infoobj} ></Taskdisplay>
    </div>
  );
}

export default App;
