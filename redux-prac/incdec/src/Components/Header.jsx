import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import { Increment,Decrement } from '../actions/index';

const Header = () => {

    const mystate=useSelector((state)=>state.changethenum);
    const dispatch=useDispatch();
    return (
    <div>
        <div class="input">
           
           <button onClick={()=>dispatch(Decrement())}>-</button>
           <input type="text" name="quantity" value={mystate} />
           <button  onClick={()=>dispatch(Increment(5))}>+</button>
        </div>
    </div>
    );
}
 
export default Header;