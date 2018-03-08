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
//Middlewear to load static files for rendering such as home.html
app.use(express.static(__dirname+'/htmlFiles'))

const port = process.env.PORT || 3000;

//Render the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/htmlFiles/home.html');
});

//Send the data to server (doesn't do anything with it yet)
app.post('/todos', (req, res)=>{
  var todo = new Todo({             //Use the Todo model
    text: req.body.text             //Uses the req.body object, looks for a property called text, and passes it
  });                               //Note: The actual req.body.text value is defined by something that is trying to post data to this server

  //save the data to mongodb by using the .save()
  todo.save().then((doc)=>{
    res.send(doc);                  //If all goes well
  }, (e)=>{
    res.status(400).send(e);        //If there was an error, also send back a status of 400.
  });
});

//Get request
app.get('/todos', (req, res) => {
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
