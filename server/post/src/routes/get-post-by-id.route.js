const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/:id', async (req, res) => {
  const post = await Post.findOne({post_id: req.params.id})

  if(!post){
    return res.sendStatus(404)
  }

  res.send(post)
})

module.exports = router