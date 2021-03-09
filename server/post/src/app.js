const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const createPost = require('./routes/create-post.route')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())

app.use('/post', createPost)

module.exports = app