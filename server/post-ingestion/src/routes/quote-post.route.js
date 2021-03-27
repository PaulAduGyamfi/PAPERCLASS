const express = require('express')
const router = express.Router()
const { requireAuth, currentUser} = require('@pgcomm/common')
const Post = require('../models/Post')
const {randomBytes} = require('crypto')

router.post('/c/post/q', async(req, res) => {
  const id = randomBytes(8).toString('hex')
  const { author, author_id, quote_id, text, attachment } = req.body
  let post

  try {
     post = await Post.findById(quote_id)
  } catch (error) {
    return res.status(422)
  }

  const new_post = await new Post({
      author,
      author_id,
      text,
      is_quote: true,
      quote_origin_id: quote_id,
      post_id: id
  })

  await new_post.save()

  post.share_count = post.share_count + 1
  post.quoted_this_post.push(new_post._id)

  await post.save()

  res.status(201).send(new_post)

})

module.exports = router