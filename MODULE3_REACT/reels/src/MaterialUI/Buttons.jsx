import React from 'react';

import {Button} from "@material-ui/core"

const Buttons = () => {
    return (
    <div>
      
       <Button variant="contained">hey</Button>
       <Button variant="outlined">hey</Button>

       <Button variant="text">hey</Button>
       {/* <Button variant="contained">hey</Button>
       <Button variant="contained">hey</Button> */}

       {/* inline styling */}
       <Button style={{marginLeft:"10px",backgroundColor:"red"}}variant="contained">hey</Button>

       <Button onClick={()=>alert("button clicked")} variant="contained"  color="secondary">hey</Button>
    </div>
    );
}
 
export default Buttons;