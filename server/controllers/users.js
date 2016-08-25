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
  req.session.first_name = result.first_name;
  res.json(result);
}

module.exports = {
  login: (req, res) => {
    User.findOne({username: req.body.username}, (err, result) => {
      if (err) { 
        res.json(err); return; 
      } 
      else if (result) {
        if (req.body.password == result.password){
          setSession(req, res, result);
        }
        else{
          sendError(res, "login", "Invalid Username or Password")
        }
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
  },
  register: (req,res) => {
    var new_user = new User({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });
    new_user.save((err, result) => {
      if (err){
        console.log(err)
        res.json(err);
      }
      else{
        setSession(req, res, result)
      }
    })
  }
}

