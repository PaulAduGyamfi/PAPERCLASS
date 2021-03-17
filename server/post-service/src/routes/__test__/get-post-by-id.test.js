const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
 const Post = require('../../models/Post')

 it('should receive statsus 302 (redirect) if user is not authorized', async () => {
  await request(app)
  .get('/g/post/583fh9403nf')
  .send()
  .expect(302)
 })

it('returns a 404 if the post is not found', async () => {
  await request(app)
  .get('/g/post/48924hbfbb238')
  .set('Cookie', fakeAuth())
  .send()
  .expect(404)
})

it('returns the post if the post is found ', async () => {
  const text = "Who did the CSE homework?"
  const post = new Post({
    author: 'paul',
    author_id: '8djeu7he7he8j3o',
    text,
    post_id: '4j4j8rj4ue8eh37'
  })

  await post.save()

    const postResponse = await request(app)
      .get(`/g/post/${post.post_id}`)
      .set('Cookie', fakeAuth())
      .send()
      .expect(200)

     expect(JSON.parse(postResponse.text).text).toEqual(text)

})