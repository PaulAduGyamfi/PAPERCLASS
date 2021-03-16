const { Publisher, Subjects } = require('@pgcomm/common')

class UserCreatedPublisher extends Publisher {
  _subject = Subjects.UserCreated
}

module.exports = { UserCreatedPublisher }