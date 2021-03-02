const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session')
require('dotenv').config()
require('./config/passport.config')(passport)



const app = express()

app.use(cors())
app.use(bodyParser.json())

// cookie encryotion and age
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

// initialize passport
app.use(passport.initialize()) 
app.use(passport.session())


app.use('/', require('./routes/auth.route'))
app.use('/auth', require('./routes/oauth.route'))

module.exports = app