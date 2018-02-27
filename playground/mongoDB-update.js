//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log("Unable to connect to database server.");
  }
  console.log('Connected to mongodb server');

  db.collection('Todos').findOneAndUpdate({
    text: 'Eat lunch' //Filter
  }, {
    $set: {
      completed: true  //What to update
    }
  },{
    returnOriginal: false //Options, in this case we dont want to return orignal doc
  }).then((result)=>{
    console.log(result);
  });

  //db.close();
});
