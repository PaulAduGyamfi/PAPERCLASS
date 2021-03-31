const express = require('express')
const router = express.Router()
const { requireAuth, currentUser} = require('@pgcomm/common')
const Post = require('../models/Post')
const {randomBytes} = require('crypto')
const { PostQuotedPublisher } = require('../events/publishers/post-quoted-publisher')
const nats = require('../nats')

router.post('/c/post/q', async(req, res) => {
  const id = randomBytes(8).toString('hex')
  const { author, author_id, quote_id, text, attachment } = req.body

  try {
     const post = await Post.findById(quote_id)
     
     const new_post = await new Post({
      author,
      author_id,
      text,
      is_quote: true,
      quote_origin_id: quote_id,
      post_id: id
    })

    await new_post.save()

    post.quoted_this_post.push(new_post._id)
    post.share_count = post.share_count + 1

    await post.save()

    new PostQuotedPublisher(nats.client).publish(new_post)

    res.status(201).send(new_post)

  } catch (error) {
      
    return res.status(422)

  }


})

module.exports = router