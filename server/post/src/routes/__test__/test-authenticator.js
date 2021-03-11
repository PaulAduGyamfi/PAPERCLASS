const jwt = require('jsonwebtoken')


const fakeAuth = () => {
  const payload = {
    user_posts: [],
    user_saved_posts: [],
    programs_following: [],
    profile_private: false,
    permissions: -1,
    new_register: true,
    _id: "604931114bee09001e99c01d",
    google_id: "384342342342344243",
    full_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@stonybrook.edu",
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

module.exports = { fakeAuth }