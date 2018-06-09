const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//A schema allows you to tack methods on. Tack the methods on, then pass the UserSchema to the UserModel defined below.
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required:true,
      trim: true,
      minlength: 1,
      unique: true, //Make sure this v  alue isn't a duplicate
      validate:{
        validator: (value) => {
          return validator.isEmail(value);  //Check to see if the email is a real email.
        },
        message: '{VALUE} is not a valid email.'
      }
    },
    password:{
      type:String,
      require: true,
      minlength: 6
    },
    tokens: [{  //it's an array
      access: {
        type: String,
        require: true
      },
      token: {
        type:String,
        require:true
      }
    }]
});

//Override method
//ideally the .toJSON method sends back everything from the object. So someObject.toJSON will convert everything from that object to json.
//by overriding .toJSON specifically for this document, we make it so that the .toJSON will only send back things we want it to send.
//in this case it only sends the _id and email. That way the user will not see anything else that is part of the user model, i.e. the tokens and password.
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//Add instance methods, done by adding method to .methods, over here we are adding a new instance method called generateAuthToken
UserSchema.methods.generateAuthToken = function() {
  var user = this; //Get the individual document

  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'someSecretValueToSalt').toString();

  user.tokens = user.tokens.concat([{access, token}]); //Add this onto the user model for which you call this method.

  //return back the return value of saving the document. If it's a success, return back the token.
  return user.save().then(()=>{
    return token;
  });
};

//Add model method, done by adding methods to .statics, over here we are adding a new model method called findByToken
UserSchema.statics.findByToken = function(token){
  var User = this; //Get the user model itself
  var decoded;

//Check to see if jwt.verify works, if it does then set decoded = to jwt.verify. If it doesn't work then catch the error.
  try{
    decoded = jwt.verify(token, 'someSecretValueToSalt');
  }catch(e){
    // return new Promise((resolve, reject)=>{
    //   reject();
    // });
    return Promise.reject(); //Same thing as returning a new promise, and then rejecting it.
  }

//Query the database, return the document that is found with the give query or return none if there are none.
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,  //To query something thats nested, like tokens.token, you need to wrap it in quotes
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

 module.exports = {
   User:User
 };
