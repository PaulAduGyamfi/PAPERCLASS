const request = require('supertest')
const app = require('../../app')

it('has a route handler lsitening to post/ for post requests', async () => {
  const response = await request(app)
    .post('/post')
    .send({})

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in otherwise rediredct', async () => {
  const response = await request(app)
    .post('/post')
    .send({})
    .expect(302)
})
