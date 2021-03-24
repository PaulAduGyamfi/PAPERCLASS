const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')

it('has a route handler lsitening to /c/post/comment for post requests ', async () => {
  const response = await request(app)
    .post('/c/post/comment')
    .send({
      author: "two10p",
      author_id: "138dh366364vd77310"
    })

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed, otherwise redirect', async () => {
  const response = await request(app)
    .post('/c/post/comment')
    .send({})

    expect(response.status).toEqual(302)
})

it('return a status 404 if post does not exist ', async () => {
  const response = await request(app)
    .post('/c/post/comment')
    .set('Cookie', fakeAuth())
    .send({
      author: 'two10p',
      author_id: '34293r2h4d31983',
      text: 'Yeah I agree with this!!!',
      origin_id: '32043u234gd831'
    })

    expect(response.status).toEqual(404)
})

it('should return a status 201 if comment is successfully created ', async () => {

  const post = await new Post({
    author: 'paul',
    author_id: '8djeu7he7he8j3o',
    text: 'Yo this app is so fire!!',
    post_id: '4j4j8rj4ue8eh37'
  })
  await post.save()

  const commentResponse = await request(app)
    .post('/c/post/comment')
    .set('Cookie', fakeAuth())
    .send({
      author: 'two10p',
      author_id: '34293r2h4d31983',
      text: 'Yeah I agree with this!!!',
      origin_id: post._id
    })
    .expect(201)

    const origin_post = await Post.findOne({_id: commentResponse.body.origin_id})
    expect(origin_post.comment_count).toEqual(1)
    expect(origin_post.comments.length).toEqual(1)
})