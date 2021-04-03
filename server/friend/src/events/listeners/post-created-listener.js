const { Listener, Subjects } = require('@pgcomm/common')
const { queueGrouName } = require('./queue-group-name')
const { FriendListPublisher } = require('../publishers/friend-list-publisher')
const nats = require('../../nats')
const postgres = require('../../postgres')

class PostCreatedListener extends Listener {
  _subject = Subjects.PostCreated
  _queueGroupName = queueGrouName

  async onMessage(data, msg) {
    const { id, author_id } = data
    console.log('[Post ID: ' + id + '] [Created By: '+ author_id+']')

    const text = 'SELECT * FROM relationship WHERE ((requester_id = $1 OR addressee_id = $1) AND status_code = $2)'
    const values = [author_id, '1']

    const response = await postgres.client.query(text, values)
    
    const friendlist = []

    response.rows.forEach(pair => {
      pair.requester_id == author_id ? friendlist.push(pair.addressee_id) : friendlist.push(pair.requester_id)
    })

    // console.log(friendlist)
    const sendObject = {
      author_id,
      post_id: id,
      friendlist
    }

    new FriendListPublisher(nats.client).publish(sendObject)

    msg.ack()
  }
}

module.exports = { PostCreatedListener }
