/**
 @class Listener
 */
 class Listener {
  _subject
  _queueGroupName
   #client
   _ackWait = 5 * 1000

   constructor(client){
      this.#client = client
      // if(this.constructor = Listener){
      //   throw new Error('Listener is an abstract class and cannot be instantiated')
      // }
   }

   onMessage(_data, _msg) {
     throw new Error('You have to implement the method onMessage!')
   }

   subscriptionOptions() {
     return this.#client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this._ackWait)
        .setDurableName(this._queueGroupName)
   }

   listen() {
      const subscription = this.#client.subscribe(
        this._subject,
        this._queueGroupName,
        this.subscriptionOptions()
        )

      subscription.on('message', (msg) => {
        console.log(
          `Message received: ${this._subject} / ${this._queueGroupName}`
        )

        const parsedData = this.parseMessage(msg)
        this.onMessage(parsedData, msg)
      })
   }

   parseMessage(msg) {
      const data = msg.getData()
      return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'))
   }
}

module.exports = { Listener }