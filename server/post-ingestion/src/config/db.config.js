const mongoose = require('mongoose')
const nats = require('../nats')
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