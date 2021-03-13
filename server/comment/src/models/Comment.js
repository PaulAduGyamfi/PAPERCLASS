const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  original_post_id:{
    type: String,
    required: true,
  },
  comment_id:{
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
  reply: [{
    type: ObjectId,
    ref: 'Comment'

  }],
  reply_count: {
    type: Number,
    default: 0
  },
  vote_count: {
    type: Number,
    default: 0
  },
  up_vote: [{
    type: ObjectId,
    ref: 'User'
  }],
  down_vote: [{
    type: ObjectId,
    ref: 'User'
  }],
  comment_url: {
    type: String,
  },
  deleted_at: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Comment', CommentSchema)