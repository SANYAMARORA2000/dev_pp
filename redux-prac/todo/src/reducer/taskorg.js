const IntialState=""


const taskdes=(state=IntialState,action)=>
{
    switch(action.type)
    {
        case "ADD":return state;
        default:return state;
    }
}
export default taskdes;