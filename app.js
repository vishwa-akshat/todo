//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteChecked);
filterOption.addEventListener('click',filterTodo);


//Functions

function addTodo(event){
    // Prevent Form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo= document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to localStorage
    saveLocalTodos(todoInput.value);
    //Completed Checked Mark Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML="<i class ='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Delete Mark Button

    const trashButton = document.createElement("button");
    trashButton.innerHTML="<i class ='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list

    todoList.appendChild(todoDiv);

    //Clear Todo Input value
    todoInput.value= '';
};


function deleteChecked(event){
    const item = event.target;
    const todo= item.parentElement;
    //Delete TODO
    if(item.classList[0]==='trash-btn'){  
        todo.classList.add("fall"); 
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        });
    }

    //Check Mark
    if(item.classList[0]==='complete-btn'){
        todo.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all': 
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display= 'flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display= 'flex';
                }else{
                    todo.style.display='none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check Does it contains items
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo= document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Completed Checked Mark Button
    
        const completedButton = document.createElement("button");
        completedButton.innerHTML="<i class ='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Delete Mark Button
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML="<i class ='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        //Append to list
    
        todoList.appendChild(todoDiv); 
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}