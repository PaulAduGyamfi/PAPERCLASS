const express = require('express')
const router = express.Router()
const Program = require('../models/Program')
const {createProgram} = require('../controllers/program.controller')
const {createCourse} = require('../controllers/course.controller')
const programArray = require('../config/programs.config')
const Course = require('../models/Course')

// login/signup page route
router.get('/program',async (req, res)=>{
  programArray.forEach(program => {
    createProgram(program)
    program.programCourses.forEach(course => {
      createCourse(course)
    })
  })
  const program = await Program.find()
  if(program){
    res.send(program)
  }else{
    res.send('no program')
  }
  
})

module.exports = router