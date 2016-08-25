var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Schema = mongoose.Schema;

var refTo = collection => ({ type: Schema.Types.ObjectId, ref: collection })
var reqField = (type, errMsg) => ({
  type: type, 
  required: [true, errMsg]
})
const TS = {timestamps: true}


mongoose.model('Category', new Schema({
  name:       reqField(String, 'Please provide a category name'),
  topics:     [refTo('Topic')],
  resources:  [refTo('Category')]
}))


mongoose.model('Comment', new Schema({
  text:       reqField(String, 'Please provide a comment'),
  votes:     [refTo('Vote')],
  resources: [refTo('Resource')]
}, TS))

mongoose.model('Response', new Schema({
  text:       reqField(String, 'Please provide a comment'),
  agree:      { type: Boolean, default: true},
  comments:   [refTo('Comment')],
  votes:      [refTo('Vote')],
  resources:  [refTo('Resource')],
  _idea:       refTo('Idea'),
  _user:       refTo('User'),
}, TS))

mongoose.model('Idea', new Schema({
  text:       { type: String, required: [true, 'Please provide an idea'] },
  votes:       [refTo('Vote')],
  _topic:       refTo('Topic'),
  _user:        refTo('User'),
  resources:   [refTo('Resource')],
  responses:   [refTo('Response')]
}, TS))

mongoose.model('Topic', new Schema({
  title:         reqField(String, 'Please provide a topic title'),
  description:   reqField(String, 'Please provide a topic description'),
  ideas:        [refTo('Idea')],
  resources:    [refTo('Resource')],
  categories:   [refTo('Category')]
}, TS))