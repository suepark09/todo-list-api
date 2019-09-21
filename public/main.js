// const axios = require('axios'); 

// document.getElementById("submit-btn").addEventListener("click", clickFunction())

// function clickFunction () {
//      axios.get('/api/todos').then(function (response) {
//         console.log(response.data);
//         document.getElementById('todos-container').innerHTML = response.data; 
//     })

//     return getTodo;
// }

// ============

const btn = document.getElementById("submit-btn");
btn.addEventListener("click", function () {
    console.log("hii")
    getAllTodo();
})

function getAllTodo () {
    fetch('/api/todos')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });

    // let todoHTML = rendertodos()
}

// getAllTodo();

// function rendertodos (todos) {
//     console.log(todos)
//     let todoHTML = todos.map(function(allTodos) {
//         return `
//             <div>${allTodos}</div>
//         `
//     })

//     return todoHTML.join
// }


