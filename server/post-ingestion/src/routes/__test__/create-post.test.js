const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const nats = require('../../nats')

it('has a route handler lsitening to /c/post/ for post requests', async () => {
  const response = await request(app)
    .post('/c/post')
    .send({
      author: "two10p",
      author_id: "231942342342"
    })

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in otherwise rediredct', async () => {
  
  const response = await request(app)
    .post('/c/post')
    .set('Cookie', fakeAuth())
    .send({
      author: "two10p",
      author_id: "231942342342",
      text: "TDD"
    })
    expect(response.status).toEqual(201)
})

it('publishes a post created event', async () => {
  const text = "Who did the CSE homework?"

  await request(app)
    .post('/c/post')
    .set('Cookie', fakeAuth())
    .send({
      author: "two10p",
      author_id: "231942342342",
      text
    })
    .expect(201)

    expect(nats.client.publish).toHaveBeenCalled()
});
