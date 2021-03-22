const postgres = require('../postgres')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await postgres.createClient()
  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB