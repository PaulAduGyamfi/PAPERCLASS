const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')
const mongoose = require('mongoose')

const userid = new mongoose.Types.ObjectId().toHexString()

it('should have status 302 to redirect user if not logged in', async () => {
  await request(app)
    .post('/c/post/d')
    .send({})
    .expect(302)
})

it("should should push users downvote if the user hasn't voted", async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
  })

  await post.save()

  const downvoteResponse = await request(app)
    .post('/c/post/d')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })
    .expect(200)

    expect(downvoteResponse.body.down_votes.length).toEqual(1)
    expect(downvoteResponse.body.down_votes.includes(userid)).toEqual(true)
    expect(downvoteResponse.body.vote_count).toEqual(1)
})

it('should remove upvote and add downvote to post if user previously upvoted', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
  })

  await post.save()

  await request(app)
    .post('/c/post/u')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })

  const downvoteResponse = await request(app)
  .post('/c/post/d')
  .set('Cookie', fakeAuth())
  .send({
    id: userid,
    post_id: post._id
  })
  .expect(200)

  expect(downvoteResponse.body.down_votes.length).toEqual(1)
  expect(downvoteResponse.body.down_votes.includes(userid)).toEqual(true)
  
  expect(downvoteResponse.body.up_votes.length).toEqual(0)
  expect(downvoteResponse.body.up_votes.includes(userid)).toEqual(false)
  
  expect(downvoteResponse.body.vote_count).toEqual(1)
})

it('should remove downvote if user previously downvoted', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
  })

  await post.save()

  await request(app)
      .post('/c/post/d')
      .set('Cookie', fakeAuth())
      .send({
        id: userid,
        post_id: post._id
      })

  const downvoteResponse = await request(app)
    .post('/c/post/d')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })
    .expect(200)

    expect(downvoteResponse.body.down_votes.length).toEqual(0)
    expect(downvoteResponse.body.down_votes.includes(userid)).toEqual(false)
    expect(downvoteResponse.body.vote_count).toEqual(0)
})