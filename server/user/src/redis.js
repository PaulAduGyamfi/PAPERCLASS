const redis = require('redis')

class Redis {
  #client

  get client() {
    if(!this.#client) {
      throw new Error('Cannot access NATS client before connecting')
    }

    return this.#client
  }
  
  createClient(redisHost){
    this.#client = redis.createClient(6379, redisHost)

    return new Promise((resolve, reject) => {
      this.#client.on('connect', () => {
        console.log(`Redis connected:${redisHost}`)
        resolve()
      })
      this.#client.on('error', (err) => {
        reject(err)
      })
    })
  }
}

module.exports = new Redis()