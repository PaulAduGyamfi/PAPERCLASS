const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/u', currentUser, requireAuth, async (req, res) => {
  
  const { id, post_id } = req.body
  let post

 try {
     post = await Post.findOne({_id: post_id})
 } catch (error) {
    return res.sendStatus(422)
 }

  // If user already upvoted and clicks upvote again, then remove their vote
  if(post.up_votes.includes(id)){
    const index = await post.up_votes.indexOf(id)
    await post.up_votes.splice(index, 1)
    await post.save()
  }
  // If user dwonvoted before but the selects to upvote, remove downvote and place in upvote
  else if(post.down_votes.includes(id)){
    const index = await post.down_votes.indexOf(id)
    await post.down_votes.splice(index, 1)
    await post.up_votes.push(id)
    await post.save()
  }
  else{
    // Otherwise if user hasn't voted before just push to upvotes
    await post.up_votes.push(id)
    await post.save()
  }
  res.status(200).send(post)
})

module.exports = router