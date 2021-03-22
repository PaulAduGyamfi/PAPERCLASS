const postgres = require('../postgres')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await postgres.createClient()
    
    await postgres.client.query("INSERT INTO friendship (RID, AID) VALUES (123134, 342342), (23465, 872937);")
      .then(res => console.log('Table Created', res))
      .catch(e => console.error(e.stack))


  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB