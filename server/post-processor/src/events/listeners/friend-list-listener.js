const { Listener, Subjects } = require('@pgcomm/common')
const { queueGrouName } = require('./queue-group-name')
const redis = require('../../redis')

class FriendListListener extends Listener {
  _subject = Subjects.FriendList
  _queueGroupName = queueGrouName

  async onMessage(data, msg) {
     console.log(data)

     const member = JSON.stringify({
      post_id: data.post_id, 
      timestamp: data.timestamp
    })

      console.log(member)

    redis.client.SADD(data.author_id, member)

    data.friendlist.forEach((msgbox) => {
      const key = msgbox
      
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