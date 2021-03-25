const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { requireAuth, currentUser } = require('@pgcomm/common')

router.post('/c/post/d', currentUser, requireAuth, async (req, res) => {
  
  const { id, post_id } = req.body
  let post

 try {
     post = await Post.findOne({_id: post_id})
 } catch (error) {
    return res.sendStatus(422)
 }

  // If user already downvoted and clicks downvotw again, then remove their vote
  if(post.down_votes.includes(id)){
    const index = await post.down_votes.indexOf(id)
    await post.down_votes.splice(index, 1)
    post.vote_count = post.vote_count - 1
    await post.save()
  }
  // If user upvoted before but the selects to downvote, remove upvote and place in downvote
  else if(post.up_votes.includes(id)){
    const index = await post.up_votes.indexOf(id)
    await post.up_votes.splice(index, 1)
    await post.down_votes.push(id)
    await post.save()
  }
  else{
    // Otherwise if user hasn't voted before just push to downvotes
    await post.down_votes.push(id)
    post.vote_count = post.vote_count + 1
    await post.save()
  }
  res.status(200).send(post)
})

module.exports = router