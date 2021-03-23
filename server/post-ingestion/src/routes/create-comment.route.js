const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const {randomBytes} = require('crypto')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/comment/', currentUser, requireAuth, async (req, res) => {
  const id = randomBytes(8).toString('hex')
  const { text, attachments, origin_id, author, author_id} = req.body
  let post

  const new_comment = await new Post({
    author,
    author_id,
    text,
    post_id: id,
    origin_id
  })

  await new_comment.save()

  try {
        post = await Post.findOne({ _id: origin_id})
        await post.comments.push(new_comment)
        post.comment_count = post.comment_count +1
        await post.save()

  } catch (error) {
      return res.sendStatus(404)
  }

  // publish comment:created event
  
  res.status(201).send(post)
})

module.exports = router