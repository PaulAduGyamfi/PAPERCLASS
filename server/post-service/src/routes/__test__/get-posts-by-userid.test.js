const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')

it('should receive status 302 (redirect) if user is not authorized ', async () => {
    await request(app)
    .get('/g/post/usr/n48cb83bfy74bvf')
    .send()
    .expect(302)
})

it('should return status 404 if post is not found ', async () => {
  await request(app)
  .get('/g/post/usr/j48hduhbeb37vd63vde')
  .set('Cookie', fakeAuth())
  .send()
  .expect(404)
})

it('should return the post if the post is found', async () => {
  const text = 'Yooo TDDDD is lowkey litt!'

  const post1 = new Post({
    author: 'TWO10P',
    author_id: 'h48h4f8b48db3',
    text,
    post_id: '84bf48fb4774b3bgd'
  })

  const post2 = new Post({
    author: 'TWO10P',
    author_id: 'h48h4f8b48db3',
    text,
    post_id: '84bf48fb4774b3bgd'
  })

  await post1.save()
  await post2.save()

  const postResponse = await request(app)
      .get(`/g/post/usr/${post1.author_id}`)
      .set('Cookie', fakeAuth())
      .send()
      .expect(200)

      expect(postResponse.body.length).toEqual(2)

})