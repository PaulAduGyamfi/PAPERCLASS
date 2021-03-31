const { Publisher, Subjects } = require('@pgcomm/common')

class PostRepostedPublisher extends Publisher {
  _subject = Subjects.PostReposted
}

module.exports = { PostRepostedPublisher }