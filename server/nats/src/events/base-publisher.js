class Publisher {
  _subject
  #client

  constructor(client) {
    this.#client = client
  }

  publish(data) {
    return new Promise((resolve, reject) => {
      this.#client.publish(this._subject, JSON.stringify(data), (err) => {
        if(err){
          return reject(err)
        }
        console.log('Event published too subject:', this._subject)
        resolve()
      })
    })
    
  }

}

module.exports = { Publisher }