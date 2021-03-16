const request = require('supertest')
const app = require('../../../../post-ingestion/src/app')
const { fakeAuth } = require('../../../../post-ingestion/src/routes/__test__/test-authenticator')

xit('returns a 404 if the post is not found', async () => {
  await request(app)
  .get('/api/post/675757676576')
  .send()
  .expect(404)
})

xit('returns the post if the post is found ', async () => {
  const text = "Who did the CSE homework?"
  const response = await request(app)
    .post('/api/post')
    .set('Cookie', fakeAuth())
    .send({
      text
    })
    .expect(201)

    const postResponse = await request(app)
      .get(`/api/post/${response.body.post_id}`)
      .send()
      .expect(200)

    expect(postResponse.body.text).toEqual(text)

})