// Hard Code
const productsArr = ['buy', 'shop', 'acquire', 'purchase', 'obtain', 'stock up'];
const booksArr = ['study', 'scan', 'read', 'perusal', 'browse'];
const moviesArr = ['watch', 'see', 'movie', 'theater', 'cinema', 'drama', 'opera', 'avengers', 'spiderman', ''];
const restaurantsArr = ['dine', 'lunch', 'eat', 'dinner', 'brunch', 'breakfast', 'snack','teatime', 'cafe', 'mcdonalds', 'tim', 'wendys'];

// Client facing scripts here
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

    if (booksArr.includes(newTodo.innerText.split(" ")[0])) {
        booksList.appendChild(todoDiv);
    } else if (moviesArr.includes(newTodo.innerText.split(" ")[0])) {
        moviesList.appendChild(todoDiv);
    } else if (restaurantsArr.includes(newTodo.innerText.split(" ")[0])) {
        restaurantsList.appendChild(todoDiv);
    } else if (productsArr.includes(newTodo.innerText.split(" ")[0])) {
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
