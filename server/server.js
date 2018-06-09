//Import Libraries
const express = require('express');
const bodyParser = require('body-parser');
const _=require('lodash');

//Import local stuff
//REquire the mongoose config file
var {mongoose} =require('./db/mongoose.js');
const {ObjectID} = require('mongodb');
//Load in the models from mongoose
var {Todo} = require('./models/todo');
var {User}= require('./models/user');
//middlewear
var {authenticate} = require('./middlewear/authenticate');
var app = express();

//Middlewear
app.use(bodyParser.json());
//Middlewear to load static files for rendering such as home.html
app.use(express.static(__dirname+'/htmlFiles'))

const port = process.env.PORT || 3000;

//Render the home page
app.get('/', (req, res) => {
  //res.sendFile(__dirname+'/htmlFiles/home.html');
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
    res.status(400).send(e +' , in other words: something wrong with the data you are sending.');        //If there was an error, also send back a status of 400.
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

//GET /todos/1234324
app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }else{
    Todo.findById(id).then((todo)=>{
      if(!todo){
        res.status(400).send();
      }else{
        res.send(todo);
      }
    })
  }
});

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }else{
    Todo.findByIdAndRemove(id).then((todo)=>{
      if(!todo){
        res.status(400).send();
      }else{
        res.send(todo);
      }
    });
  }
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); //Use lodash to pull out specific properties from the info the user is sending to update the todo

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();          //Add a new comepletedAt time if user wants the updated todo to already be completed
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  //For updating, you have to use mongoose operators to query
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{  //Query explained: (id u want to search for, what you want it to be, return back new one)
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo}); //send back object called todo with the values of todo that we go back from the callback


  }).catch((e)=>{
    res.status(400).send();
  });
});

//Registering a NEW User
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']); //lodash library to make a new object called body, contains the email and password values from 'req.body' (which is what the users input is stored in)
  //already instatieted the users model at the top of this file
  var user = new User(body); //make new user object with body's email and password key value pairs as the arguments

  user.save().then(()=>{  //Save document, .then speicfies a success case, in which case it will generateAuthToken
    return user.generateAuthToken();
  }).then((token)=>{      //token argument is refering to the 'return user.generateAuthToken' on the line prior. This is chaining callbacks, so each .then() call refers to the call before it
    res.header('x-auth', token).send(user); //This sends back the user model and also sets the header. .header takes in two arguments, the name of the header and the value of header. In this case, starting the name of the header with 'x-' it becomes a cutom header, so not something http supports by default.
  }).catch((e)=>{ //Catch errors if any statement before fails.
    res.status(400).send(e) //Error if it doesnt save
  });
});

// adding 'authenticate' to the arguments for .get() uses the authenticate middlewear, so the middlewear is called before this route loads in
app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
});

app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
