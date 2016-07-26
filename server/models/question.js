console.log('questions model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
// build your question schema and add it to the mongoose.models

var OptionSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: [true, 'Please provide text for your option'],
    minlength: [3, 'Please provide an option that is at least 3 characters long'], 
  },
  votes: {
    type: Number,
    default: 0
  }
})

var QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [8, 'Please provide a question that is at least 8 characters long'], 
    required: [true, 'Please provide a question']
  },
  options: [OptionSchema],
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

var Question = mongoose.model('Question', QuestionSchema)
