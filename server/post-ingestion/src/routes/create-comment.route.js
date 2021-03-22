const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const {randomBytes} = require('crypto')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/comment/', currentUser, requireAuth, async (req, res) => {
  const id = randomBytes(8).toString('hex')
  const { text, attachments, origin_id, author, author_id} = req.body

  const new_comment = await new Post({
    author,
    author_id,
    text,
    post_id: id,
    origin_id
  })

  await new_comment.save()

  const post = await Post.findOne({ post_id: origin_id})

  await post.comments.push(new_comment)
  await post.save()

  res.status(201).send(post)
})

module.exports = router