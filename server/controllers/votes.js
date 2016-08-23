var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');
var voteTypes = require('../models/vote.js')
var User = mongoose.model('User')

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

module.exports = {
  index: (req,res) => { 
    Vote.find({}).populate('_user').exec(sendResults(res)) 
  },
  create:  (req,res) => {
    // double check that all necessary pieces of information are available
    var checkField = (fieldName, location) => {
      if (location == null) {
        sendError(res,'request','Incomplete Request. ('+fieldName+')');
        return false;
      }
      return true;
    }
   
    if (!checkField('_user', req.session._id) ||
        !checkField('Type', req.body.type) ||
        !checkField('Element post_id', req.body.post_id) ||
        !checkField('Up vote or down vote?', req.body.up)
      ) { return; }

    switch (req.body.type.toLowerCase()) {
      case 'idea':
      case 'response': 
      case 'resource': 
      case 'comment': 
        var post_type = req.body.type.substr(0,1).toUpperCase() + req.body.type.substr(1).toLowerCase() 
        var post_type_l =  req.body.type.toLowerCase() 
        var [Post, PostVote] = [mongoose.model(post_type), voteTypes[post_type_l]];
        break;
      default:
        sendError(res, 'request','Incomplete Request. (type)');
        return;
    }

    // look to see if user has voted for this idea, response, or comment before.
    var voteData = { _user: req.session._id }
    voteData['_' + post_type_l] = req.body.post_id
    console.log(voteData)

    PostVote
      .findOne(voteData)
      .exec(checkForErrors(req,res,(err, vote) => {
        // If user has already voted on this idea, response, or comment, update whether it is an up or down vote.
        if (vote) {
          vote.up = req.body.up;
          vote.save(sendResults(res));
          return;
        }

        // Otherwise: create new vote, save it to post, save it to user
        voteData.up = req.body.up;
        var newVote = new PostVote(voteData);
        newVote.save(checkForErrors(req,res,(err, result)=>{
          Post.findByIdAndUpdate(
            req.body.post_id, 
            {$push: {votes: newVote}},
            checkForErrors(req,res,(err,result)=>{
              User.findByIdAndUpdate(
                req.session._id,
                {$push: {votes: newVote}},
                (err, result) => { sendResults(res)(err, newVote) }
              )
            })
          )
        }))
      }))
  }, // end of vote method
  destroy: (req, res) => {
    if(!req.params.id) { 
      sendError(res, 'id', 'Please give user a valid vote ID.');
      return;
    } else if(!req.session._id) {
      sendError(res, 'id', 'Please login.');
      return;
    }
    Vote.findByIdAndRemove(
      req.params.id, 
      checkForErrors(req,res,(err,vote)=>{
        if (!vote) { sendError(res, "vote", "No such vote"); return;}
        var post_type = vote.kind.replace("Vote","")
        var Post = mongoose.model(post_type);
        Post.findByIdAndUpdate(
          vote['_'+post_type],
          { $pull: { votes: vote._id } },
          checkForErrors(req,res,(err,post)=>{
            User.findByIdAndUpdate(
              vote._user,
              { $pull: { votes: vote._id } },
              sendResults(res)
            )
          })
        )
      })
    )
  } 
}
