const { Publisher, Subjects } = require('@pgcomm/common')

class PostPinnedPublisher extends Publisher {
  _subject = Subjects.PostPinned
}

module.exports = { PostPinnedPublisher }