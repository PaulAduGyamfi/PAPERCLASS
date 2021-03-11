const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')

it('has a route handler lsitening to post/ for post requests', async () => {
  const response = await request(app)
    .post('/api/post')
    .send({
      author: "two10p",
      author_id: "231942342342"
    })

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in otherwise rediredct', async () => {
  
  const response = await request(app)
    .post('/api/post')
    .set('Cookie', fakeAuth())
    .send({
      text: "TDD"
    })
    expect(response.status).toEqual(201)
})
