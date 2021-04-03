const { Listener, Subjects } = require('@pgcomm/common')
const { queueGrouName } = require('./queue-group-name')
const redis = require('../../redis')

class FriendListListener extends Listener {
  _subject = Subjects.FriendList
  _queueGroupName = queueGrouName

  async onMessage(data, msg) {
     console.log(data)

    data.friendlist.forEach((msgbox) => {
      const key = msgbox
      const member = data.post_id
      redis.client.SADD(key, member)
    })
  
    // TEST QUERY
    // redis.client.SMEMBERS("6066a0eb304eab1ab26768a6", (err, res) => {
    //   const result = res
    //   console.log(result)
    // })

    msg.ack()
  }
}

module.exports = { FriendListListener }