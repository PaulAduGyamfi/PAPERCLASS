const express = require('express')
const router = express.Router()
const randomBytes = require('randombytes')
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')



router.post('/', currentUser, requireAuth, async (req,res)=>{
  const id = randomBytes(8).toString('hex')
  const { text, attachments} = req.body

  const new_post = {
    author: req.currentUser.full_name,
    author_id: req.currentUser._id,
    text,
    post_id: id
  }

  await Post.create(new_post)

  res.status(201).send(new_post)
  

})

router.get("/", currentUser, requireAuth, async (req, res) => {
 
  res.send({currentUser: req.currentUser || null})
})

module.exports = router
