const { Client } = require('pg')

class Postgres {
  #client

  get client() {
    if(!this.#client) {
      throw new Error('Cannot access Postgres client before connecting')
    }

    return this.#client
  }
  
  createClient(){
    this.#client = new Client({
      user: process.env.POSTGRES_USER, 
      host: process.env.POSTGRES_HOST, 
      database: 'pauladu', 
      password: process.env.POSTGRES_PASSWORD  
    })

    return new Promise((resolve, reject) => {
      this.#client.connect((err) => {
        if(err){
          console.log(err)
          reject(err)
        }
        console.log(`Postgres connected:${process.env.POSTGRES_HOST}`)
        resolve()
      })
    })
  }
}

module.exports = new Postgres()