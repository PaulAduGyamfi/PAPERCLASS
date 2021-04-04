const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')
const redis = require('../redis')

router.get('/g/post/timeline/home', async (req, res) => {

  const { id } = req.body

  let message_box = []
  let posts = []
    const fanout = async (callback) => {
      redis.client.SMEMBERS(id, (err, result) => {
        
        result.forEach((e) => {
          const post_obj = JSON.parse(e)
          message_box.push(post_obj.post_id)
        })

        callback()

      })
    }

    const response = async () => {
      
      posts = await Post.find({_id: message_box, deleted_on: null})
  
      res.status(200).send(posts)
    }


    await fanout(response)
})

module.exports = router