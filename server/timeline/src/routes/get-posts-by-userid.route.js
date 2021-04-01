const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth} = require('@pgcomm/common')

router.get('/g/post/usr/:id', currentUser, requireAuth, async (req, res) => {
  const users_posts = await Post.find({author_id: req.params.id})

  if(users_posts.length == 0){
    return res.sendStatus(404)
  }
  res.send(users_posts)
})

module.exports = router