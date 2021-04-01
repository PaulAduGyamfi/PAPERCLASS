const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')

router.get('/g/post/:id', currentUser, requireAuth, async (req, res) => {
  let post
  try {
     post = await Post.findById(req.params.id)
  } catch (error) {
    return res.sendStatus(404)
  }

  if(!post){
    return res.sendStatus(404)
  }

  res.send(post)
})

module.exports = router