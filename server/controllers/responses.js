var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');
var Response = mongoose.model('Response');
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
    Response.find({_topic: req.params.id})
      .populate('_user')
      .exec( sendResults(res)) },
  show:  (req,res) => { 
    Response.findById(req.params.id, sendResults(res)) 
  },
  create: (req,res) => {
    if (!req.session._id) {
      sendError(res, 'login','Please Login'); 
      return;
    }
    var response = new Response(bodyData(req, ['text', 'agree']));
    response._user = req.session._id;
    response._idea = req.params.id;
    response.save((err, response) => {
      if (err) { res.json(err); return; }
      Response.findByIdAndUpdate(
        req.params.id, 
        {$push: {ideas: response._id}},
        (err, topic) => { 
          User.findByIdAndUpdate(
            req.params._id, 
            {$push: {ideas: response._id}},
            (err, user) => {
              sendResults(res)(err, response)
            } // end of userUpdate callback
          ); // end of userFindAndUpdate
        } // end of topicFindAndupdate callback
      ); // end of topicFindAndupdate
    }); // end of response.save
  }, // end of create function
  delete: (req,res) => { 
    Response.remove({_id: req.params.id, _user: req.session._id}, 
      (err) => { res.json( err? err : {}); }
    ) 
  }
}
