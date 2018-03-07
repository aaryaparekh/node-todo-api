const expect = require('expect');
const request = require('supertest');

//Local stuff
const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

beforeEach((done) => {        //Run this code before every test to setup database in a way that we expect it to be
  Todo.remove({}).then(()=>{  //wipes all todos
    done();                   //If successful, exit beforeEach
  });
});

//Describe is used just to organize tests in cmd
describe('POST /todos', ()=>{

  it('should create a new todo', (done)=>{  //This is tested asynchronousyly so done is an argument
    var text = 'Test todo text';

    request(app)    //Start the request via supertest
    .post('/todos') //Sets up a post request
    .send({text})   //Send a object with a key called text with a value of text (text:text)
    .expect(200)    //Expect an 'ok' status
    .expect((res)=>{
      expect(res.body.text).toBe(text); //make sure that the promise when the todo is saved to mongodb sends back the correct data to us
    })                                  //to confirm that it has been saved
    .end((err, res) => {                //Actually check what got sent to the database
      if(err){
        return done(err);               //If there was an error, then just quit the test
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(1);   //beforeEach() on the top of this script should make sure that no docs were in the db, so now we should have 1
        expect(todos[0].text).toBe(text);//make sure the text property is what we said it should be
        done(); //finish async task
      }).catch((e) => done(e));         //catch any errors and send them back and quit the test
    });
  });

  //Make sure todos with invalid data does not go through
  it('should not create todo with invalid body data', (done)=>{
    request(app)
    .post('/todos')
    .send()             //dont send anything
    .expect(400)        //expect an error
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>done(e));
    });
  });

});
