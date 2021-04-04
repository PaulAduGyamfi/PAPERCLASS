const express = require('express')
const router = express.Router()
const {randomBytes} = require('crypto')
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')
const { PostCreatedPublisher } = require('../events/publishers/post-created-publisher')
const nats = require('../nats')



router.post('/c/post', currentUser, requireAuth, async (req,res)=>{
  const id = randomBytes(8).toString('hex')
  const { text, attachments, author, author_id} = req.body

  const new_post = await new Post({
    author,
    author_id,
    text,
    post_id: id
  })

  await new_post.save()

  const data = {
    id: new_post._id,
    author_id: author_id,
    timestamp: new_post.created_on
  }

  new PostCreatedPublisher(nats.client).publish(data)

  res.status(201).send(new_post)
  

})

router.get("/", currentUser, requireAuth, async (req, res) => {
 
  res.send({currentUser: req.currentUser || null})
})

module.exports = router
