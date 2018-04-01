var mongoose = require('mongoose');

var User = mongoose.model('User',{
  username:{
    type: String,
    require: true,
    trim: true,
    minlength: 5
  },
  password:{
    type: String,
    require: true,
    trim: true,
    minlength:5
  }

});

 module.exports = {
   User:User
 };
