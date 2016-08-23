var mongoose = require('mongoose');
var User = mongoose.model('User');
// var bcrypt = require('bcrypt');

function sendResults(res) {
  return (err, result) => { res.json(err? err: result); }
}
function sendError(res, cat, err) {
  var errorObj = {errors: {}}
  errorObj['errors'][cat] = {message: err}
  res.json(errorObj);
}
function setSession(req, res, result) {
  req.session._id = result._id;
  req.session.name = result.name;
  res.json(result);
}

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name}, (err, result) => {
      if (err) { 
        res.json(err); return; 
      } else if (result) {
        setSession(req, res, result);
      } else {
        var new_user = new User({name: req.body.name});
        new_user.save((err, result) => {
          console.log(result, err)
          if (!result || !result.errors) {
            setSession(req, res, result);
          } else {
            res.json(result)
          }
        })
      }
    })
  },
  logout: (req,res) => {
    req.session.destroy();
    res.json({});
  },
  session: (req,res) => { res.json(req.session) },
  delete:  (req,res) => { 
    User.findByIdAndRemove(req.params.id, 
      sendResults(res)
    ) 
  }
}

