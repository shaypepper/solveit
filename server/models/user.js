console.log('users model');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var refs = type => [{ type: mongoose.Schema.Types.ObjectId, ref: type }]
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a  name'],
    minlength: [2, 'Your name needs to be at least two characters long'],
    unique: true
  },
  votes:      refs('Vote'),
  topics:     refs('Topic'),
  ideas:      refs('Ideas'),
  responses:  refs('Response'),
  comments:   refs('Comment'),
  resources:  refs('Resources'),

}, {timestamps: true})
UserSchema.plugin(uniqueValidator, {message: 'A user with that name already exists'})

mongoose.model('User', UserSchema)