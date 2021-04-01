const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
require('dotenv').config()
const getPostById = require('./routes/get-post-by-id.route')
const getPostsByUserId = require('./routes/get-posts-by-userid.route')


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

app.use(getPostById)
app.use(getPostsByUserId)

module.exports = app