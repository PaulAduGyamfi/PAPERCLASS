const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const createPost = require('./routes/create-post.route')
const createComment = require('./routes/create-comment.route')
const upvote = require('./routes/upvote.route')
const downvote = require('./routes/downvote.route')
const deletePost = require('./routes/delete-post.route')
const quotePost = require('./routes/quote-post.route')
const repostPost = require('./routes/repost-post.route')
const updatePost = require('./routes/update-post.route')
const pinPost = require('./routes/pin-post.route')

require('dotenv').config()


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

app.use(createPost)
app.use(createComment)
app.use(upvote)
app.use(downvote)
app.use(deletePost)
app.use(quotePost)
app.use(repostPost)
app.use(updatePost)
app.use(pinPost)

module.exports = app