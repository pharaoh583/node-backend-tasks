//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
// const url = require('url');
// const querystring = require('querystring');
var jsonParser = bodyParser.json();
// const Article = require('./models').Article;
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var cont = 0;
var tasks = []

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.get("/tasks/:idtask",(req, res, next) => {
    var id = req.params.idtask;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            res.json(tasks[i]);
        }
    }
    res.send("No se encontro la tarea");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    console.log(req.body);
    req.body.id = cont++;
    req.body.state = "pending";
    console.log(req.body);
    tasks.push(req.body);
    res.send("OK");
});

app.put("/tasks/:idtask", jsonParser, (req, res, next) => {
    console.log(req.query.state);
    console.log(req.idtask);
    if(req.query.state != null){
        var id = req.params.idtask;
        for(var i = 0; i < tasks.length; i++){
            if(tasks[i].id == id){
                tasks[i].state = req.query.state;
                res.send("OK");
            }
        }
        res.send("No se encontro la tarea");
    }
    if(req.body != null){
        var id = req.params.idtask;
        for(var i = 0; i < tasks.length; i++){
            if(tasks[i].id == id){
                req.body.id = tasks[i].id;
                req.body.state = tasks[i].state;
                tasks[i] = req.body;
                res.send("OK");
            }
        }
        res.send("No se encontro la tarea");
    }
    
});

app.delete("/tasks/:idtask", (req, res, next) =>{
    var id = req.params.idtask;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            tasks.splice(i, 1);
            res.send("OK");
        }
    }
    res.send("No se encontro la tarea");
});

// app.put("/tasks/:idtask?state=completed",jsonParser, (req, res, next) =>{
//     var id = req.params.idtask;
//     for(var i = 0; i < tasks.length; i++){
//         if(tasks[i].id == id){
//             tasks[i].state = "completed";
//             res.send("OK");
//         }
//     }
//     res.send("No se encontro la tarea");
// });

// app.put("/tasks/:idtask?state=pending", (req, res, next) =>{
//     var id = req.params.idtask;
//     for(var i = 0; i < tasks.length; i++){
//         if(tasks[i].id == id){
//             tasks[i].state = "pending";
//             res.send("OK");
//         }
//     }
//     res.send("No se encontro la tarea");
// });

// app.put("/")



app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});