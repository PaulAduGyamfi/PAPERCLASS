const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  created_on: {
    type: Date,
    default: Date.now
  },
  modified_on: {
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
  vote_count: {
    count: {
      type: Number,
      default: 0
    },
    upvote_count: {
      type: Number,
      default: 0
    },
    downvote_count: {
      type: Number,
      default: 0
    }
  },
  up_votes: [{
    type: ObjectId,
    ref: 'User'
  }],
  down_votes: [{
    type: ObjectId,
    ref: 'User'
  }],
  origin_id:{
    type: String,
    default: null,
  },
  comment_count: {
    type: Number,
    default: 0
  },
  comments: [{
    type: ObjectId,
    ref: 'Post'
  }],
  reposted: {
    type: Boolean,
    default: false,
  },
  repost_origin_id:{
    type: String,
    default: null
  },
  repost_count: {
    type: Number,
    default: 0
  },
  reposters: [{
    type: ObjectId,
    ref: 'User'
  }],
  post_url: {
    type: String,
  },
  deleted_on: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Post', PostSchema)