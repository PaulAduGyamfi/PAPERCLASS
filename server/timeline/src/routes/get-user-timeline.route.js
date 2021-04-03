const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')
const redis = require('../redis')

router.get('/g/post/timeline/user/:id', async (req, res) => {

  let message_box = []
  let posts = []
    const fanout = async (callback) => {
      redis.client.SMEMBERS(req.params.id, (err, result) => {
        
        result.forEach(e => {
          message_box.push(e)
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