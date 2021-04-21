const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('dotenv').config()
require('./config/passport.config')(passport)
const oauth = require('./routes/google-oauth.route')
const onboarding = require('./routes/onboarding.route')
const login = require('./routes/temp.route')
const getUserById = require('./routes/get-user-by-id.route')


const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(bodyParser.json())

// cookie encryotion and age
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [process.env.COOKIE_KEY]
// }))

app.use(require('express-useragent').express())

// initialize passport
app.use(passport.initialize()) 
app.use(passport.session())


app.use(login)
app.use(oauth)
app.use(onboarding)
app.use(getUserById)


module.exports = app