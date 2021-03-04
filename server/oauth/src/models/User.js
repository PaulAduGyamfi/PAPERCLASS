const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: false,
  },
  fullName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false
  },
  graduationYear: {
    type: String,
    required: false
  },
  degreeProgram:{
    type: String,
    required: false
  },
  degreeMajor: {
    type: String,
    required: false
  },
  programsFollowing: [{
    type: ObjectId,
    ref: "Program"
  }],
  coursesFollowing: [{
    type: ObjectId,
    ref: "Course"
  }],
  socialMediaHandles: {
    type: Map,
    of: String
  },
  profilePrivacy: {
    type: String,
    required: true,
    default: 'public'
  },
  permissions: {
    type: Number,
    default: -1,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  },
  newRegister: {
    type: Boolean,
    default: true,
    required: true
  }

})

module.exports = mongoose.model('User', UserSchema)