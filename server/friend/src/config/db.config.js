const postgres = require('../postgres')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await postgres.createClient()
    // const query = "CREATE TABLE IF NOT EXISTS relationship (requester_id varchar(450) NOT NULL, addressee_id varchar(450) NOT NULL, status_code integer NOT NULL DEFAULT '0', action_user_id varchar(450) NOT NULL, CONSTRAINT unique_user_id UNIQUE(requester_id, addressee_id));"
    // const res = await postgres.client.query(query)
    //  await postgres.client.end()
  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB