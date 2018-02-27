//Import Libraries
var express = require('express');
var bodyParser = require('body-parser');

//Import local stuff
//REquire the mongoose config file
var{mongoose}=require('./db/mongoose.js');
//Load in the models from mongoose
var {Todo} = require('./models/todo');
var {User}= require('./models/user');

var app = express();

//Middlewear
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
  var todo = new Todo({             //Use the Todo model
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);                  //If all goes well
  }, (e)=>{
    res.status(400).send(e);                    //If there was an error, also send back a status of 400.
  });
});

app.listen(3000, ()=> {
  console.log('Started on port 3000');
});
