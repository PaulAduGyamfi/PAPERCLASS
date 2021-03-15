const { Publisher, Subjects } = require('@pgcomm/common')

class PostCreatedPublisher extends Publisher {
  _subject = Subjects.PostCreated
}

module.exports = { PostCreatedPublisher }