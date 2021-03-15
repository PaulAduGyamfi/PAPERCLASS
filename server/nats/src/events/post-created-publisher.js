const { Publisher } = require('./base-publisher')
const { Subjects } = require('./subjects')

class PostCreatedPublisher extends Publisher {
  _subject = Subjects.PostCreated
}

module.exports = { PostCreatedPublisher }