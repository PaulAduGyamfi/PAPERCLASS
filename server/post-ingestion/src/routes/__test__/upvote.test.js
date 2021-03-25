const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')
const mongoose = require('mongoose')


const userid = new mongoose.Types.ObjectId().toHexString()


it('should have status 302 to redirect user if not logged in', async () => {
  await request(app)
    .post('/c/post/u')
    .send({})
    .expect(302)
})

it("should should push users upvote if they haven't voted", async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
  })

  await post.save()

  const upvoteResponse = await request(app)
    .post('/c/post/u')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })
    .expect(200)

    expect(upvoteResponse.body.up_votes.length).toEqual(1)
    expect(upvoteResponse.body.up_votes.includes(userid)).toEqual(true)
    expect(upvoteResponse.body.vote_count).toEqual(1)
})

it('should remove downvote and add upvote if user previously downvoted', async () => {
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

    const upvoteResponse = await request(app)
    .post('/c/post/u')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })
    .expect(200)

    expect(upvoteResponse.body.up_votes.length).toEqual(1)
    expect(upvoteResponse.body.up_votes.includes(userid)).toEqual(true)
    
    expect(upvoteResponse.body.down_votes.length).toEqual(0)
    expect(upvoteResponse.body.down_votes.includes(userid)).toEqual(false)
    
    expect(upvoteResponse.body.vote_count).toEqual(1)


})

it('should remove upvote if user previously upvoted', async () => {
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

  const upvoteResponse = await request(app)
    .post('/c/post/u')
    .set('Cookie', fakeAuth())
    .send({
      id: userid,
      post_id: post._id
    })
    .expect(200)

    expect(upvoteResponse.body.up_votes.length).toEqual(0)
    expect(upvoteResponse.body.up_votes.includes(userid)).toEqual(false)
    expect(upvoteResponse.body.vote_count).toEqual(0)
})