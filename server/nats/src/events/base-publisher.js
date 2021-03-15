class Publisher {
  _subject
  #client

  constructor(client) {
    this.#client = client
  }

  publish(data) {
    this.#client.publish(this._subject, JSON.stringify(data), () => {
      console.log('Event published!')
    })
  }

}

module.exports = { Publisher }