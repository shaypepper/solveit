var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Schema = mongoose.Schema;

var refTo = collection => ({ type: Schema.Types.ObjectId, ref: collection })
var reqField = (type, errMsg) => ({
  type: type, 
  required: [true, errMsg]
})
const TS = { timestamps: true }
const DK = { discriminatorKey: 'kind' }

var Vote = mongoose.model('Vote',  new Schema({
  up:         { type: Boolean, default: true},
  _user:      refTo('User')
}, {timestamps: true, discriminatorKey: 'kind'}))

module.exports = {
  "response": Vote.discriminator('ResponseVote', new Schema({ _response: refTo('Response') }, DK )),
  "resource": Vote.discriminator('ResourceVote', new Schema({ _resource: refTo('Resource') }, DK )),
  "comment":  Vote.discriminator('CommentVote',  new Schema({ _comment:  refTo('Comment')  }, DK )),
  "idea":     Vote.discriminator('IdeaVote',     new Schema({ _idea:     refTo('Idea')     }, DK ))
}