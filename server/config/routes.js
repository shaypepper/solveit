var mongoose = require('mongoose');
var questions = require('../controllers/questions.js')
var users = require('../controllers/users.js')

console.log('routes');
module.exports = function(app){
  app.get('/', function(req,res){ res.json({'hey':'something worked'}) })
  app.get('/questions', questions.index);         // show all
  app.get('/questions/:id', questions.show);      // show one
  app.post('/questions', questions.create);       // create question 
  app.delete('/questions/:id', questions.delete);
  app.post('/questions/:question_id/:option_id', questions.vote_up);

  app.post('/login', users.login);    // login
  app.get('/logout', users.logout);   // logout
  app.get('/session', users.session); // retrieve session info
}