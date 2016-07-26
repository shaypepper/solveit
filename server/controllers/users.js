var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

function sendResults(res) {
  return (err, result) => { res.json(err? err: result); }
}
function sendError(res, cat, err) {
  var errorObj = {errors: {}}
  errorObj['errors'][cat] = {message: err}
  res.json(errorObj);
}

var ID = req => ({_id: req.params.id})

module.exports = {
  login: (req,res) => {
    User.findOne({name: req.body.name}, (err, result) => {
      if (err) { 
        res.json(err); return; 
      } else if (result) {
        req.session._id = result._id;
        req.session.name = result.name;
        res.json(result);
      } else {
        var new_user = new User({name: req.body.name});
        new_user.save((err, result) => {
          if (!result || !result.errors) {
            req.session._id = result._id;
            req.session.name = result.name;
          }
          res.json(result);
        })
      }
    })
  },
  logout: (req,res) => {
    req.session.destroy();
    res.json({});
  },
  session: (req,res) => {
    res.json(req.session)
  },
  update: (req,res) => { 
    User.findOneAndUpdate(
      ID(req), 
      {$set: bodyData(req, userFields)}, 
      {runValidations: true},
      sendResults(res)
    ) 
  },
  delete: (req,res) => { User.remove(ID(req), sendResults(res)) }
}

