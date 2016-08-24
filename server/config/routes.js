var mongoose = require('mongoose');
var topics = require('../controllers/topics.js')
var users = require('../controllers/users.js')
var ideas = require('../controllers/ideas.js')
var votes = require('../controllers/votes.js')
var resources = require('../controllers/resources.js')
var responses = require('../controllers/responses.js')

console.log('routes');
module.exports = function(app){

  // TOPICS 
  app.get('/topics', topics.index); 
  app.post('/topics', topics.create);
  app.get('/topics/:id', topics.show);
  app.put('/topics/:id', topics.update);
  app.delete('/topics/:id', topics.destroy);

  app.post('/topics/:id/ideas', ideas.create);      // post idea on topic
  app.get('/topics/:id/ideas', ideas.index); 
  app.get('/ideas', ideas.index);
  app.get('/ideas/:id', ideas.show);
  app.put('/ideas/:id', ideas.update);
  app.delete('/ideas/:id', ideas.destroy);

  app.post('/ideas/:id/responses', responses.create);      // post idea on topic
  app.get('/ideas/:id/responses', responses.index); 


  // app.post('/topics/:topic_id/:option_id', topics.up_vote);

  app.post('/login', users.login);    // login
  app.get('/logout', users.logout);   // logout
  app.get('/session', users.session); // retrieve session info

  // votes
  app.post('/votes', votes.create)
  app.get('/votes', votes.index)
  app.delete('/votes/:id', votes.destroy)

}