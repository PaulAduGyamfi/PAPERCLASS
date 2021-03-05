const Program = require('../models/Program')

const createProgram = async(profile) => {
  const newProgram = {
    programName: profile.programName,
    programCode: profile.programCode
  }

  try {
    let program = await Program.findOne({programName: profile.programName})
    if(program){
      return
    }else{
      program = await Program.create(newProgram)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createProgram }