const postgres = require('../postgres')
const nats = require('../nats')
const { PostCreatedListener } = require('../events/listeners/post-created-listener')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await postgres.createClient()

    postgres.client.on('error', async () => {
      await postgres.createClient()
    })
    // const query = "CREATE TABLE IF NOT EXISTS relationship (requester_id varchar(450) NOT NULL, addressee_id varchar(450) NOT NULL, status_code integer NOT NULL DEFAULT '0', action_user_id varchar(450) NOT NULL, CONSTRAINT unique_user_id UNIQUE(requester_id, addressee_id));"
    // const res = await postgres.client.query(query)
    //  await postgres.client.end()

    await nats.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    nats.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })
    process.on('SIGINT', () => nats.client.close())
    process.on('SIGTERM', () => nats.client.close())

    new PostCreatedListener(nats.client).listen()
    
  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB