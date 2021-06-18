//there are two components one class based and other class less

//class based stateful components
class Counter extends React.Component{


    //constructor method is first one to fire
    constructor(){
        super();//this will fire React.Components"s constructor
        this.state={
            count:0
        }//state is empty object

    }

    increment=()=>{
        console.log("increment");
        this.setState({
            count: this.state.count + 1
        });

    }

    decrement=()=>{
        
        console.log("decrement");
        this.setState({
            count: this.state.count - 1
        });
    }

    reset=()=>{
        
        console.log("reset");
        this.setState({
            count: 0
        });
    }

    render()
    {
        let count=this.state.count
        //in this we will write jsx code
        return(
            <React.Fragment>
                <p className="badge bg-secondary d-inline-block m-2">{count}</p>

                <div>
                <button className="btn btn-primary m-2" onClick={this.increment}>+</button>
                <button className="btn btn-danger m-2" onClick={this.decrement}>-</button>
                <button className="btn btn-warning m-2" onClick={this.reset}>RESET</button>
                </div>
                
                
            </React.Fragment>
        )
    }

}





ReactDOM.render(<Counter></Counter>,document.querySelector("#root"));