const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const ProgramSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true
  },
  programCourses: [{
    type: ObjectId,
    ref: "Course"
  }],
  programDescription: {
    type: String,
    required: false,
  },
  
  
  

})

module.exports = mongoose.model('Program', ProgramSchema)