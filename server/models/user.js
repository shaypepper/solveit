console.log('users model');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
var refs = type => [{ type: mongoose.Schema.Types.ObjectId, ref: type }]
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minlength: [2, 'Your name needs to be at least two characters long'],
    unique: [true, 'A current user already has that username']
  },
  first_name: {
    type: String,
    required: [true, 'Please provide your first name'],
    minlength: [2, 'Invalid first name']
  },
  last_name: {
    type: String,
    required: [true, 'Please provide your last name'],
    minlength: [2, 'Invalid last name']
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid E-mail Address'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  votes:      refs('Vote'),
  topics:     refs('Topic'),
  ideas:      refs('Ideas'),
  responses:  refs('Response'),
  comments:   refs('Comment'),
  resources:  refs('Resources'),

}, {timestamps: true})
UserSchema.plugin(uniqueValidator, {message: 'A user with that name already exists'})

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// // checking if password is valid
// usersSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

// usersSchema.pre('save', function(done) {
//     this.password = this.generateHash(this.password);
//     done();
// });

mongoose.model('User', UserSchema)