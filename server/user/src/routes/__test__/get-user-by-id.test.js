const request = require('supertest')
const app = require('../../app')
const User = require('../../models/User')
const { fakeAuth } = require('./test-authenticator')


it('should return status 302 redirect if user is not authorized ', async () => {
  await request(app)
    .get('/g/usr/7051b77047ec460777eafa78')
    .send()
    .expect(302)
})

it('should return a status 404 if user is not found', async () => {
  await request(app)
    .get('/g/usr/6041b63045ec360202eefa78')
    .set('Cookie', fakeAuth())
    .send()
    .expect(404)
})

it('should return the user if user exists ', async () => {
  const user  = new User({
    profile_private: false,
    permissions: -1,
    new_register: true,
    google_id: "64646739930200222",
    full_name: "Bohn Goe",
    first_name: "Bohn",
    last_name: "Goe",
    email: "bohngoe@stonybrook.edu",
    profile_image_url: "https://lh4.googleusercontent.com/-GoCefpPT3cw/AAAAAAAAAAI/AAAAAAAAAJ0/AMZuucljD8UalDzuu91e2PaUuAYJDrYcTA/s96-c/photo.jpg"
    })
  await user.save()

  const response = await request(app)
    .get(`/g/usr/${user._id}`)
    .set('Cookie', fakeAuth())
    .send()
    .expect(200)

     expect(response.body._id).toEqual(user._id.toString())
})