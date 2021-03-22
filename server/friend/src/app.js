const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
require('dotenv').config()
const friendRequest = require('./routes/friend-request.route')
const friendAccept = require('./routes/friend-request-accept.route')
const friendDecline = require('./routes/friend-request-decline.route')
const userBlock = require('./routes/block-user.route')


const app = express()
app.set('trust proxy', true)
app.use(cors())
app.use(bodyParser.json())

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(friendRequest)
app.use(friendAccept)
app.use(friendDecline)
app.use(userBlock)

module.exports = app