
///bcrypt////-------
const bcrypt = require('bcryptjs');

var password = '123abc';
//Generate a hash
bcrypt.genSalt(10, (err, salt)=>{ //first generate salt, '10' represents amount of times to run the algorithim to generate salt, bigger value = more saftey = more time
    bcrypt.hash(password, salt, (err, hash)=>{ //hash password after salt is gernerated, use the password and salt to genererate a hash through the callback
      console.log('this is the hased password:', hash);
    });
  });

//to Check if passwords match do this
var hashedPassword = '$2a$10$1uph67JYXaoW2nKEQqJr5.bD.5gCVMt73NJu/whMoMFUFWF21ijBC';

bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(res);
});







// const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();  //Hashed values are objects, convert to string to print them
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var dataToCheck = {
//   id: 4
// };
//
// var token = {
//   data: dataToCheck,
//   //Salt and hash
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //Because data is an object so use JSON.stringify to convert to string to hash
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed, dont trust');
// }


/////JWT//////------
// const jwt = require('jsonwebtoken');
//
// var data = {
//   id:10
// };

// var token = jwt.sign(data, 'saltValue');
// console.log(token);
//
// var decoded = jwt.verify(token, 'saltValue');
// console.log('decoded', decoded);
