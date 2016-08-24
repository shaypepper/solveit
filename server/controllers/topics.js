var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

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
    Topic.find({})
      .populate('_user')
      .exec( sendResults(res)) },
  show:  (req,res) => { 
    Topic.findById(req.params.id)
      .populate('ideas _user resources')
      .exec(sendResults(res)) 
  },
  create: (req,res) => {
    if (!req.session._id) {
      sendError(res, 'login','Please Login'); 
      return;
    }
    var topic = new Topic(bodyData(req, ['description', 'title']));
    topic._user = req.session._id;
    topic.save(sendResults(res));
  },
  update: (req,res) => {
    
  },
  destroy: (req,res) => {}

  // delete: (req,res) => { 
  //   Topic.remove({_id: req.params.id, _user: req.session._id}, 
  //     (err) => { res.json( err? err : {}); }
  //   ) 
  // }
}
