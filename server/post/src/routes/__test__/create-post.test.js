const request = require('supertest')
const app = require('../../app')
const jwt = require('jsonwebtoken')

it('has a route handler lsitening to post/ for post requests', async () => {
  const response = await request(app)
    .post('/post')
    .send({
      author: "two10p",
      author_id: "231942342342"
    })

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in otherwise rediredct', async () => {
  const fakeAuth = () => {
    const payload = {
      user_posts: [],
      user_saved_posts: [],
      programs_following: [],
      profile_private: false,
      permissions: -1,
      new_register: true,
      _id: "604931114bee09001e99c01d",
      google_id: "112085455213814752588",
      full_name: "2",
      first_name: "10",
      last_name: "p",
      email: "two10@stonybrook.edu",
      profile_image_url: "https://lh4.googleusercontent.com/-GoCefpPT3cw/AAAAAAAAAAI/AAAAAAAAAJ0/AMZuucljD8UalDzuu91e2PaUuAYJDrYcTA/s96-c/photo.jpg",
      created_at: "2021-03-10T20:50:25.897Z",
      modified_at: "2021-03-10T20:50:25.897Z",
      __v: 0
      }
      // create a jwt
      const token = jwt.sign(payload, process.env.COOKIE_KEY)

      // build store token in session object
      const session = {jwt: token}

      // convert session object into JSON
      const sessionJSON = JSON.stringify(session)

      // encode the JSON to base64
      const base64 = Buffer.from(sessionJSON).toString('base64')

      return [`express:sess=${base64}`]
  }
  const response = await request(app)
    .post('/post')
    .set('Cookie', fakeAuth())
    .send({
      text: "TDD"
    })
    expect(response.status).toEqual(201)
})
