const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseNumber: {
    type: String,
    required: true
  },
  courseDescription: {
    type: String,
    required: false,
  },
  courseProgram: [{
    type: ObjectId,
    ref: "Program"
  }]
  
  
  

})

module.exports = mongoose.model('Course', CourseSchema)