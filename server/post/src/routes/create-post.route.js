const express = require('express')
const router = express.Router()
const randomBytes = require('randombytes')
const Post = require('../models/Post')

router.post('/', (req,res)=>{
  const id = randomBytes(8).toString('hex')
  const { author, author_id, text, attachments} = req.body

  const new_post = {
    author,
    author_id,
    text,
    post_id: id
  }

  Post.create(new_post)

  res.status(201).send(new_post)
  

})

router.get("/", (req, res) => {
  res.send(req.session)
})

module.exports = router
