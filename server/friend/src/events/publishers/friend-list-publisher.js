const { Publisher, Subjects } = require('@pgcomm/common')

class FriendListPublisher extends Publisher {
  _subject = Subjects.FriendList
}

module.exports = { FriendListPublisher }