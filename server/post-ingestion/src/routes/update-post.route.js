const express = require('express')
const router = express.Router()
const { requireAuth, currentUser } = require('@pgcomm/common')
const Post = require('../models/Post')

router.patch('/c/post/update', async (req, res) => {
  const { text, attatchments, id} = req.body

  const post = await Post.findById(id)

  post.text = text
  post.modified_on = Date.now()
  await post.save()

  return res.status(200).send(post)

})

module.exports = router