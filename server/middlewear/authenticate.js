var {User} = require('./../models/user');

var authenticate = (req, res, next)=>{
  var token = req.header('x-auth'); //get the header token values

  User.findByToken(token).then((user)=>{
    //If no user with that token was found, then do this:
    if(!user){
      return Promise.reject(); //run the error case in .catch()
    }
    //If user with given token was found, then change the user and token variables in the request:
    req.user = user;
    req.token = token;
    next(); //Call next to move past this middlewear and move on to the route
  }).catch((e)=>{
    res.status(401).send(); //401 error means authintication required
  });
};

module.exports = {authenticate};
