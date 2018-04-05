const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove

Todo.findByIdAndRemove('asdf').then((todo)=>{

});
