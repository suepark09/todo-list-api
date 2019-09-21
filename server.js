var express = require('express');
var bodyParser = require('body-parser');
let Joi = require('joi');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

var todoList = [
    {
        id: 1,
        todo: "Wash dishes"
    }
];

// GET /api/todos
app.get("/api/todos", function (request, response) {
    console.log(request.params);
    response.send(todoList)
})

// GET /api/todos/:id
app.get("/api/todos/:id", function (request, response, nextFn) {
    const todoItem = todoList.find(function(item) {
        return item.id === parseInt(request.params.id)
    })

    if (!todoItem) {
        response.status(404)
        nextFn()
    } else {
        response.send(todoItem)
    }
})

// POST /api/todos

app.post("/api/todos", function (request, response, nextFn) {
    const {error} = validateTodo(request.body)
    if (error) {
        response.status(400).send(result.error.details[0].message);
        return;
    }

    const todos = {
        id: todoList.length + 1,
        todo: request.body.todo
    };

    todoList.push(todos);
    response.send(todos);
})

//validation function
function validateTodo (todo) {
     const schema = {
        todo: Joi.string().min(3).required()
     };
     return Joi.validate(todo, schema);
}

// PUT /api/todos/:id
app.put('/api/todos/:id', function (request, response) {
    const todos = todoList.find(function (item) {
        return item.id === parseInt(request.params.id);
    })
    if (!todos) response.status(404).send('the to do was not found');

    const {error} = validateTodo(request.body)
    if (error) {
        response.status(400).send(result.error.details[0].message);
        return;
    }

    todos.todo = request.body.todo;
    response.send(todos);

})


// DELETE /api/todos/:id
app.delete('/api/todos/:id', function (request, response) {
    //find item id
    const todos = todoList.find(function (item) {
        return item.id === parseInt(request.params.id);
     });
     if (!todos) response.status(404).send('the to do was not found');
 
     const index = todoList.indexOf(todos);
     todoList.splice(index, 1);
 
     response.send(todos);
}) 
    
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening in port ${port}...`)
})