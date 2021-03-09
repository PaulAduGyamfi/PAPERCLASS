const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  google_id: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: false,
  },
  full_name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profile_image_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  location: {
    type: String
  },
  pinnned_post_id: {
    type: ObjectId,
    ref: 'Post'
  },
  user_posts:[{
    type: ObjectId,
    ref: 'Post'
  }],
  user_saved_posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
  graduation_year: {
    type: String,
    required: false
  },
  degree_program:{
    type: String,
    required: false
  },
  degree_major: {
    type: String,
    required: false
  },
  programs_following: [{
    type: ObjectId,
    ref: "Program"
  }],
  social_media_handles: {
    type: Map,
    of: String
  },
  profile_private: {
    type: Boolean,
    required: true,
    default: false
  },
  permissions: {
    type: Number,
    default: -1,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  new_register: {
    type: Boolean,
    default: true,
    required: true
  }

})

module.exports = mongoose.model('User', UserSchema)