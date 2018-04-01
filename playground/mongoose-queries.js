const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

// var id = '5a9f6b493f61f744133b2ee2';
//
// if(!ObjectID.isValid(id)){             //Check if ID is a real ID
//   console.log('id not valid');
// }

// Todo.find({
//   //Queries
//   _id: id //You can check for id's by just passing in a string, Mongoose will convert it to a _id object automaticaly
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todos', todo);
// })


// Todo.findById(id).then((todo)=>{
//   if(!todo){                                  //ERROR HANDLER
//     return console.log('Id not found');
//   }
//   console.log('Find by id:', todo);
// }).catch(e)=>console.log(e)); //Catch error if id is invalid
