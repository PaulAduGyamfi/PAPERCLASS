const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')
const mongoose = require('mongoose')

const id1 = new mongoose.Types.ObjectId().toHexString()

it('should return a new post that is a quoted post', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
    _id: id1
  })

  await post.save()

  const quoteResponse = await request(app)
      .post('/c/post/q')
      .set('Cookie', fakeAuth())
      .send({
        author: "two10p",
        author_id: "231942342342",
        text: 'This is an original post',
        quote_id: post._id,
      })
      .expect(201)

      const parentQuote  = await Post.findById(id1)
      expect(parentQuote.share_count).toEqual(1)
      expect(parentQuote.quoted_this_post.includes(quoteResponse.body._id)).toEqual(true)
      expect(quoteResponse.body.is_quote).toEqual(true)
})