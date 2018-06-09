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

const jwt = require('jsonwebtoken');

var data = {
  id:10
};

var token = jwt.sign(data, 'saltValue');
console.log(token);

var decoded = jwt.verify(token, 'saltValue');
console.log('decoded', decoded);
