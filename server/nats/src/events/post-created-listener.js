const { Listener } = require('./base-listener')

class PostCreatedListener extends Listener {
  _subject = 'post:created'
  _queueGroupName = 'post-processor-service'

  onMessage(data, msg) {
    console.log('Event data!', data)

    msg.ack()
  }
}

module.exports = { PostCreatedListener }