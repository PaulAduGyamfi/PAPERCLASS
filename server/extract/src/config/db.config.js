const mongoose = require('mongoose')
require('dotenv').config()

const connectDB  = async () => {
  if(!process.env.MONGO_EXTRACT_URI){
    console.error(err)
  }
  try{
    const connect = await mongoose.connect(process.env.MONGO_EXTRACT_URI, {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.log(`MongoDB connected:${connect.connection.host}`)
  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB