let todoInput = document.querySelector(".todo-input"); // todo input recieved 
let addTodoButton = document.querySelector(".add-todo"); // add todo button
let todosList = document.querySelector(".todos-list"); // empty ul

//addeventlistener asociates a event with the button mentioned 
//jab bhi add to vutton pe click ho to to jo kucj function ke andar likha hai chal jayega

function addTodo()
{
    let todo = todoInput.value;//yeh jo input ki value hai vo dega
    // "" , 0 , false , undefined
    if(todo){
        let listItem = document.createElement("li");// it creates a element
         //yeh <li></li> aise banake dega
        listItem.classList.add("todo-item"); // it adds class to a element
        // <li class="todo-item"></li>;

        let pTag = document.createElement("p");
           //yeh <p></p> aise banake dega
        pTag.classList.add("todo");
        pTag.innerHTML = todo;
        // <p class="todo">Learn HTML !!!</p>

        let deleteButton = document.createElement("button");
           //yeh <button></button> aise banake dega
        deleteButton.classList.add("delete-task");
        deleteButton.innerHTML = "DELETE";
        // <button class="delete-task">DELETE</button>

        deleteButton.addEventListener("click" , function(event){
            // console.log("delete todo clicked !!!");
            // console.log(event);
            event.target.parentNode.remove();
        })

        listItem.append(pTag);
        listItem.append(deleteButton);
        //yeh do statement likhne ke baad yeh ptag aur button li main add ho jayegi

        todosList.append(listItem);
        //ul main li added
        todoInput.value = "";
        //we empty the input area
    }
    else{
        alert("you haven't entered any todo");
    }
}

addTodoButton.addEventListener("click" , function(){
    addTodo();
    
});

todoInput.addEventListener("keypress" , function(e){
    if(e.key == "Enter"){
        addTodo();
    }
});

{/* <li>
    <p class="todo"></p>
    <button class="delete-task">DELETE</button>
</li> */}




