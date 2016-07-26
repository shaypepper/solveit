console.log('users model');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a first name'],
    minlength: [2, 'Your name needs to be at least two characters long'],
    unique: true
  }
}, {timestamps: true})
UserSchema.plugin(uniqueValidator, {message: 'A user with that name already exists'})
var User = mongoose.model('User', UserSchema)
// hey