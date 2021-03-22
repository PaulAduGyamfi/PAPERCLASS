const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const {randomBytes} = require('crypto')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/comment/', currentUser, async (req, res) => {
  const id = randomBytes(8).toString('hex')
  const { text, attachments, origin_id } = req.body

  const new_comment = await new Post({
    author: req.currentUser.username,
    author_id: req.currentUser._id,
    text,
    post_id: id,
    origin_id
  })

  await new_comment.save()

  const post = await Post.findOne({ _id: origin_id})

  post.comments.push(new_comment)
  post.save()


})

module.exports = router