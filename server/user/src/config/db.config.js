const mongoose = require('mongoose')
const nats = require('../nats')
const redis = require('../redis')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await nats.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    nats.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })
    process.on('SIGINT', () => nats.client.close())
    process.on('SIGTERM', () => nats.client.close())

    await redis.createClient(process.env.REDIS_HOST)
    redis.client.on('end', () => {
      console.log('Redis connection ended!')
      process.exit()
    })

    const connect = await mongoose.connect(process.env.MONGO_USER_URI, {
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