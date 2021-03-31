const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')
const { PostPinnedPublisher} = require('../events/publishers/post-pinned-publisher')
const nats = require('../nats')

router.post('/c/post/pin', async (req, res) => {
    const { id } = req.body
    
    const post = await Post.findById( id )
    
    if(!post || post.deleted_on != null){
        return res.sendStatus(404)
    }

    // publish post:pinned event
    new PostPinnedPublisher(nats.client).publish(post)

    res.status(200).send(post)

    

})

module.exports = router