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

var Resource = mongoose.model('Resource', new Schema({
  url: {
    type: String, 
    validate: validators.isURL,
    required: [true, 'Please provide a url for your resource'] 
  }, 
  title:         reqField(String, 'Please provide a title for your resource'),
  categories:   [refTo('Category')],
  votes:        [refTo('Vote')]
}, { discriminatorKey: 'kind', timestamps: true }))

module.exports = {
  "topic":    Resource.discriminator('TopicResource',    new Schema({ _topic:    refTo('Topic')    }, DK )),
  "response": Resource.discriminator('ResponseResource', new Schema({ _response: refTo('Response') }, DK )),
  "comment":  Resource.discriminator('CommentResource',  new Schema({ _comment:  refTo('Comment')  }, DK )),
  "idea":     Resource.discriminator('IdeaResource',     new Schema({ _idea:     refTo('Idea')     }, DK ))
}
