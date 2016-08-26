var mongoose = require('mongoose')
var User = mongoose.model('User')
var Resource = mongoose.model('Resource')
var resourceTypes = require('../models/resource.js')

function sendResults(res) {
  return (err, result) => { res.json(err? err: result); }
}
function sendError(res, cat, err) {
  var errorObj = {errors: {}}
  errorObj['errors'][cat] = {message: err}
  res.json(errorObj);
}
function checkForErrors(req, res, callback) {
  return function (err, result) {
    if (err) { res.json(err); return; }
    callback(err, result)
  }
}
function checkField(req, res, fieldName, location) {
  if (location == null) {
    sendError(res,'request','Incomplete Request. ('+fieldName+')');
    return false;
  }
  return true;
}

module.exports = {
  index:  (req,res) => {
    Resource.find({}).exec(sendResults(res))
  },
  findAllByTopic: (req, res) => {
    Resource.find({ _topic: req.params.id }).exec(sendResults(res))
  },
  create: (req,res) => {
    if (
      !checkField('user', req.session._id ) ||
      !checkField('type', req.body.type)    ||
      !checkField('Element post_id', req.body.post_id)
    ) { return; }

    var post_type_l =  req.body.type.toLowerCase() 
    var post_type = post_type_l.substr(0,1).toUpperCase() + post_type_l.substr(1)
    
    if (["Topic", "Response", "Comment", "Idea"].indexOf(post_type) < 0) {
      sendError(res, 'request','Incomplete Request. (type)');
      return;
    }
    
    var [Post, PostResource] = [mongoose.model(post_type), resourceTypes[post_type_l]];

    var resourceData = { 
      _user: req.session._id,
      url:   req.body.url,
      title: req.body.title
    };
    resourceData['_'+post_type_l] = req.body.post_id;
    var newResource = new PostResource(resourceData);
    newResource.save(checkForErrors(req,res,(err,resource)=>{
      Post.findByIdAndUpdate(
        req.body.post_id,
        { $push: { resources: resource } },
        checkForErrors(req,res,(err,result)=>{
          User.findByIdAndUpdate(
            req.session._id,
            {$push: {resources: newResource}},
            (err, result) => { sendResults(res)(err, newResource) }
          )
        })
      )
    }))
  },
  

}
