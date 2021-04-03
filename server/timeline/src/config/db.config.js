const mongoose = require('mongoose')
const redis = require('../redis')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await redis.createClient(process.env.REDIS_HOST)
    redis.client.on('end', () => {
      console.log('Redis connection ended!')
      process.exit()
    })

    const connect = await mongoose.connect(process.env.MONGO_POST_URI, {
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