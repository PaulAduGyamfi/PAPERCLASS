const Course = require('../models/Course')

const createCourse = async(profile) => {
  const newCourse = {
    courseName: profile.courseName,
    courseNumber: profile.courseNumber,
    courseDescription: profile.courseDescription
  }

  try {
    let course = await Course.findOne({courseName: profile.courseName, courseNumber: profile.courseNumber})
    if(course){
      return
    }else{
      course = await Course.create(newCourse)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createCourse }