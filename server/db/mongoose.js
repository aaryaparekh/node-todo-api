//Configuration for moongoose
const mongoose = require('mongoose');

//Tell mongoose to use promises
mongoose.Promise = global.Promise;

//connect
//This part checks if mongodb should use the HEROKU mongodb extension if available, if not just use the local one
//Essentially if uploaded to heoku, use the heokou mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

//Export
module.exports = {
  mongoose: mongoose
};
