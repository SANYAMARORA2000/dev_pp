  
  let names = ["penny" , "sheldon" , "leonard" , "howard" , "rajesh"];

//stateless functional component sfc
function BigHello()
{
   return ( <React.Fragment>
        { names.map( function(name){
          return <Hello key={name} name={name}></Hello>
         }) }
   </React.Fragment>);
   
   
}  
//this is a component
function Hello(props)
{
  return <h1>Hello from {props.name} component</h1>;
}
ReactDOM.render(<BigHello></BigHello>,document.querySelector("#root"));
//ReactDOM.render(<Hello name="steve" age="18"></Hello>,document.querySelector("#root"));
