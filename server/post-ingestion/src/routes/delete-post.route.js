const express = require('express')
const router = express.Router()
const { requireAuth, currentUser} = require('@pgcomm/common')
const Post = require('../models/Post')

router.delete('/c/post/delete', currentUser, requireAuth, async (req, res) => {
  const { id, user_id } = req.body


    const post = await Post.findOne({_id: id})

    if(!post || post.deleted_on != null){
      return res.sendStatus(404)
    }
    
    
    if(user_id === post.author_id){

      // Hard Delete post if it doesn't have any comments
      if(post.comments.length == 0 && post.comment_count == 0){
        
        // if post is a comment remove comment from post 
        if(post.is_comment){
          const parent = await Post.findOne({_id: post.origin_id})
          const index = await parent.comments.indexOf(id)
          await parent.comments.splice(index, 1)
          parent.comment_count = parent.comment_count - 1
          await parent.save()
        }
        
        // if post is a quoted post remove from parent quote, quoted list
        else if(post.is_quote){
          const parentQuote = await Post.findById(post.quote_origin_id)
          const index = await parentQuote.quoted_this_post.indexOf(id)
          await parentQuote.quoted_this_post.splice(index, 1)
          parentQuote.share_count = parentQuote.share_count - 1
          await parentQuote.save()
        }
        // if post is a repost then decrease the parent share count
        else if(post.is_repost){
          const parentRepost = await Post.findById(post.repost_origin_id)
          parentRepost.share_count = parentRepost.share_count - 1
          await parentRepost.save()
        }

        // then hard delete post
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
    else{
      return res.status(404)
    }
  

  
})

module.exports = router