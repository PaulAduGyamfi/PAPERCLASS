/**
 * @abstract
 * @class
 * This abstract class can be inherited to listening for events and receive data from events
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

    /**
     * 
     * @param {Object} _data
     * ... parsed information recieved from event
     * @param {Object} _msg 
     * ...unparsed information received from event
     */
   onMessage(_data, _msg) {
     throw new Error('You have to implement the method onMessage!')
   }

   /**
    * 
    * @returns sets options to be exectuted on the client
    */
   subscriptionOptions() {
     return this.#client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this._ackWait)
        .setDurableName(this._queueGroupName)
   }

   /**
    * Subscribes to a channel and listens for an event, on an event it receives data
    */
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

   /**
    * Parses JSON data received into string
    * @param {Object} msg 
    * @returns string object
    */
   parseMessage(msg) {
      const data = msg.getData()
      return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'))
   }
}

module.exports = { Listener }