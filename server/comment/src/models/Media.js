const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const MediaSchema = new mongoose.Schema({
  media_key: {
    type: String,
    required: true
  },
  media_url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  view_count: {
    type: Number,
    default: 0
  },
  post_id: {
    type: ObjectId,
    ref: 'Post'

  },

})

module.exports = mongoose.model('Media', MediaSchema)