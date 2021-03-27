const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')
const mongoose = require('mongoose')

const id1 = new mongoose.Types.ObjectId().toHexString()


it('should return a new post that is a repost post ', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
    _id: id1
  })

  await post.save()

  const repostResponse = await request(app)
      .post('/c/post/r')
      .set('Cookie', fakeAuth())
      .send({
        author: "two10p",
        author_id: "231942342342",
        repost_id: post._id,
      })
      .expect(201)

      const parentRepost = await Post.findById(id1)
      expect(parentRepost.share_count).toEqual(1)
      expect(repostResponse.body.is_repost).toEqual(true)
})