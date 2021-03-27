const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/pin', (req, res) => {
    const { _id } = req.body
    const post = Post.findById(_id )

    // publish post:pinned event
})

module.exports = router