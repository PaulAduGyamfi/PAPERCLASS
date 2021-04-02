const { Listener, Subjects } = require('@pgcomm/common')
const { queueGrouName } = require('./queue-group-name')

class PostCreatedListener extends Listener {
  _subject = Subjects.PostCreated
  _queueGroupName = queueGrouName

  onMessage(data, msg) {
    const { id, author_id } = data
    console.log('[Post ID: ' + id + '] [Created By: '+ author_id+']')

    msg.ack()
  }
}

module.exports = { PostCreatedListener }
