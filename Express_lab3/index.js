const express = require('express')
const fs = require('fs')
const app = express()
const todo=require('./todo')
const path ="./todos.json";
var bodyParser=require('body-parser');

const logs = (req, res, next)=> {
    let current_date = new Date();
    let method = req.method;
    let url = req.url;
    let log = `${current_date} ${method}:${url}`;
    next();
  };


app.use(logs);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(["/","/todos"], function (req, res) {
    fs.readFile("./todos.json",{encoding:"utf-8"},(err,data)=>{
        if(err){
            res.statusCode=500;
            return res.send("something error"); 
        }
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(data);     
    })
})


app.post('/todos', function (req, res) {
    res.statusCode=200;
    const [obj] = req.body;
    todo.addToDo(path,obj)
    res.status(200).send("todo created successfully");
})

app.delete('/todos/:id', function (req, res) {
    if(todo.deleteToDo(req.params.id)){
        res.status(200).send("todo deleted successfully"); 
    }else{
        res.sendStatus(400).send("id not found");
    }
})

app.patch('/todos/:id', function (req, res) {
    const id = req.params.id;
    const [obj] = req.body;
    if(todo.editToDo(id,obj)){
        res.status(200).send("todo updated successfully"); 
    }else{
        res.sendStatus(400).send("id not found");
    }
})

app.listen(3000)