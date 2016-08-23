var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

function sendResults(res) {
  return (err, result) => { res.json(err? err: result); }
}
function sendError(res, cat, err) {
  var errorObj = {errors: {}}
  errorObj['errors'][cat] = {message: err}
  res.json(errorObj);
}
function bodyData(req, fields){
  var data = {};
  for (let i=0; i<fields.length; i++){
    if (fields[i] in req.body) { data[fields[i]] = req.body[fields[i]]}
  }
  return data;
}

module.exports = {
  index: (req,res) => { 
    Idea.find({_topic: req.params.id})
      .populate('_user')
      .exec( sendResults(res)) },
  show:  (req,res) => { 
    Idea.findById(req.params.id, sendResults(res)) 
  },
  update: (req,res) => {

  },
  create: (req,res) => {
    if (!req.session._id) {
      sendError(res, 'login','Please Login'); 
      return;
    }
    var idea = new Idea(bodyData(req, ['text', 'title']));
    idea._user = req.session._id;
    idea._topic = req.params.id;
    idea.save((err, idea) => {
      if (err) { res.json(err); return; }
      Topic.findByIdAndUpdate(
        req.params.id, 
        {$push: {ideas: idea._id}},
        (err, topic) => { 
          User.findByIdAndUpdate(
            req.params._id, 
            {$push: {ideas: idea._id}},
            (err, user) => {
              sendResults(res)(err, idea)
            } // end of userUpdate callback
          ); // end of userFindAndUpdate
        } // end of topicFindAndupdate callback
      ); // end of topicFindAndupdate
    }); // end of idea.save
  }, // end of create function
  destroy: (req,res) => { 
    Idea.remove({_id: req.params.id, _user: req.session._id}, 
      (err) => { res.json( err? err : {}); }
    ) 
  }
}
