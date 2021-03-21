const postgres = require('../postgres')
require('dotenv').config()

const connectDB  = async () => {
  try{
    await postgres.createClient()
    
    postgres.client.query('SELECT NOW() as now')
      .then(res => console.log(res.rows[0]))
      .catch(e => console.error(e.stack))

  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB