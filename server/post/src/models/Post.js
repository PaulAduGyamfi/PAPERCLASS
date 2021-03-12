const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  post_id:{
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  attachments: [{
    type: ObjectId,
    ref: 'Media'

  }],
  star_count: {
    type: Number,
    default: 0
  },
  stars: [{
    type: ObjectId,
    ref: 'User'
  }],
  comment_count: {
    type: Number,
    default: 0
  },
  comments: [{
    type: ObjectId,
    ref: 'User'
  }],
  repost_count: {
    type: Number,
    default: 0
  },
  reposts: [{
    type: ObjectId,
    ref: 'User'
  }],
  post_url: {
    type: String,
  },
  deleted_at: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Post', PostSchema)