const express = require('express')
const router = express.Router()
const { requireAuth, currentUser} = require('@pgcomm/common')
const Post = require('../models/Post')

router.delete('/c/post/delete', currentUser, async (req, res) => {
  const { id, user_id } = req.body
  let post

  try {
    post = await Post.findOne({_id: id})
  } catch (error) {
    return res.sendStatus(404)
  }
    
    
    if(user_id === req.currentUser.user._id){

      // Hard Delete post if it doesn't have any comments
      if(post.comments.length == 0 && post.comment_count == 0){
        
        // if post is a comment remove comment from post 
        if(post.origin_id != null){
          const parent = await Post.findOne({_id: post.origin_id})
          const index = await parent.comments.indexOf(id)
          await parent.comments.splice(index, 1)
          parent.comment_count = parent.comment_count - 1
          await parent.save()
        }
        const removed = await Post.remove({_id: post._id})
        return res.status(200).send(removed)
      }

      // Otherwise if post has comments soft delete, post can only be accessed by direct url
      else{
        post.author = '[ deleted ]'
        post.author_id = '[ deleted ]'
        post.post_id = '[ deleted ]'
        post.text = '[ deleted ]'
        post.deleted_on = Date.now()
        await post.save()
        return res.status(200).send(post)
      }

    }
  

  
})

module.exports = router