const IntialState=0;

const changethenum=(state=IntialState,action)=>{
 

    switch(action.type)
    {
        case "INC":return state+action.payload;
        case "DEC":return state-1;
        default:return state;

    }
}

export default changethenum;