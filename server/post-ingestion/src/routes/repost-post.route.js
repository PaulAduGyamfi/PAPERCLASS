const express = require('express')
const router = express.Router()
const { requireAuth, currentUser} = require('@pgcomm/common')
const Post = require('../models/Post')
const {randomBytes} = require('crypto')
const { PostRepostedPublisher } = require('../events/publishers/post-reposted-publisher')
const nats = require('../nats')

router.post('/c/post/r', async (req, res) => {
    const id = randomBytes(8).toString('hex')
    const { author, author_id, repost_id } = req.body
    let post

    try {
        post = await Post.findById(repost_id)

        const new_post = await new Post({
          author,
          author_id,
          is_repost: true,
          repost_origin_id: repost_id,
          post_id: id
      })
  
        await new_post.save()
  
        post.share_count = post.share_count + 1
  
        await post.save()
  
        new PostRepostedPublisher(nats.client).publish(new_post)
        
        res.status(201).send(new_post)

    } catch (error) {

        return res.status(422)

    }

})

module.exports = router