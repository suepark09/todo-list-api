var express = require('express');
var bodyParser = require('body-parser');
let Joi = require('joi');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
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
    const schema = {
        todo: Joi.string().min(3).required()
    };

    const result = Joi. validate(request.body, schema);

    if (result.error) {
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

// PUT /api/todos/:id
app.put('/api/todos/:id', function (request, response) {
    const todos = todoList.find(function (item) {
        return item.id === parseInt(request.params.id);
    })

    if (!todos) {
        response.status(404).send('the to do was not found');
    } 

    todoList.todos = request.body.todos;
    response.send(todos);

})


// DELETE /api/todos/:id
app.delete('/api/todos/:id')

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening in port ${port}...`)
})