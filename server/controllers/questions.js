var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var qFields = ['options','text']

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
    Question.find({})
      .populate('_user')
      .exec( sendResults(res)) },
  show:  (req,res) => { 
    Question.findOne({_id: req.params.id}, 
    sendResults(res)) 
  },
  create: (req,res) => {
    console.log(req.session)
    if (!req.session._id) {
      sendError(res, 'login','Please Login'); 
      return;
    }
    if (req.body.options.length !== 4) { 
      sendError(res, 'options', 'Please provide 4 options for your survey.'); 
      return;
    }
    var question = new Question({text: req.body.text});
    for (let i=0; i<4;i++){
      question.options.push({text: req.body.options[i]});
    }
    question._user = req.session._id;
    question.save(sendResults(res))
  },
  delete: (req,res) => { 
    Question.remove({_id: req.params.id, _user: req.session._id}, 
      (err) => { res.json( err? err : {}); }
    ) 
  },
  vote_up: (req,res) => {
    Question.findOne({_id: req.params.question_id}, (err, result)=>{
        if (err) { res.json(err); return; }
        if (!result) { res.json(err); return; }
        result.options[req.params.option_id].votes += 1;
        result.save(sendResults(res))
      })
  }
}
