const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')

router.get('/g/post/:id', currentUser, requireAuth, async (req, res) => {
  const post = await Post.findOne({post_id: req.params.id})

  if(!post){
    return res.sendStatus(404)
  }

  res.send(post)
})

module.exports = router