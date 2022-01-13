// Client facing scripts here
window.onload=function(){

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const moviesList = document.querySelector(".film-ul");
const restaurantsList = document.querySelector(".restaurants-ul");
const booksList = document.querySelector(".books-ul");
const productsList = document.querySelector(".products-ul");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
moviesList.addEventListener("click", editTodo);
restaurantsList.addEventListener("click", editTodo);
booksList.addEventListener("click", editTodo);
productsList.addEventListener("click", editTodo);



function addTodo(e) {
    //Prevent natural behaviour
    e.preventDefault();
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    //Save to local - do this last
    //Save to local
    saveLocalTodos(todoInput.value);
    //
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

   
    todoInput.value = "";


    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Create edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    
    //attach final Todo

    if (newTodo.innerText.split(" ")[0] === 'read' || newTodo.innerText.split(" ")[0] === 'Read') {
        booksList.appendChild(todoDiv);
    } else if (newTodo.innerText.split(" ")[0] === 'watch' || newTodo.innerText.split(" ")[0] === 'watch' || newTodo.innerText.split(" ")[0] === 'see' || newTodo.innerText.split(" ")[0] === 'See') {
        moviesList.appendChild(todoDiv);
    } else if (newTodo.innerText.split(" ")[0] === 'try' || newTodo.innerText.split(" ")[0] === 'Try' || newTodo.innerText.split(" ")[0] === 'eat' || newTodo.innerText.split(" ")[0] === 'Eat') {
        restaurantsList.appendChild(todoDiv);
    } else if (newTodo.innerText.split(" ")[0] === 'buy' || newTodo.innerText.split(" ")[0] === 'Buy') {
        productsList.appendChild(todoDiv);
    } else {
        productsList.appendChild(todoDiv);
    }
  }


function editTodo(e) {
    const item = e.target;
  
    if (item.classList[0] === "trash-btn") {
      // e.target.parentElement.remove();
      const todo = item.parentElement;
      todo.classList.add("fall");
      //at the end
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", e => {
        todo.remove();
      });
    }
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
      console.log(todo);
    }
  }

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }
}