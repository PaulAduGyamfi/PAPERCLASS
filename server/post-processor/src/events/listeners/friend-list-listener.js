const { Listener, Subjects } = require('@pgcomm/common')
const { queueGrouName } = require('./queue-group-name')

class FriendListListener extends Listener {
  _subject = Subjects.FriendList
  _queueGroupName = queueGrouName

  async onMessage(data, msg) {
    console.log(data)

    msg.ack()
  }
}

module.exports = { FriendListListener }