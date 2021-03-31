const { Publisher, Subjects } = require('@pgcomm/common')

class PostQuotedPublisher extends Publisher {
  _subject = Subjects.PostQuoted
}

module.exports = { PostQuotedPublisher }