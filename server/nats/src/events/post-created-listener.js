const { Listener } = require('./base-listener')
const { Subjects } = require('./subjects')

/**
 * This class ectends the Listener class, sets the subscription channel subject and queue group, executes function on data received from event
 */
class PostCreatedListener extends Listener {
  _subject = Subjects.PostCreated
  _queueGroupName = 'post-processor-service'

  onMessage(data, msg) {
    console.log('Event data!', data)

    msg.ack()
  }
}

module.exports = { PostCreatedListener }