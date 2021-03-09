const express = require('express')
const cors = require('cors')
const createPost = require('./routes/create-post.route')

const app = express()

app.use(cors())

app.use('/post', createPost)

module.exports = app