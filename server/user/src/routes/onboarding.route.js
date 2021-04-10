const express = require('express')
const router = express.Router()
const { userMustSignUp } = require('../middleware/requireLogin') 
const { UserCreatedPublisher } = require('../events/publishers/user-created-publisher')
const nats =  require('../nats')
const { currentUser, requireAuth, } = require('@pgcomm/common')
const User = require('../models/User')
const redis = require('../redis')

router.get('/signup',userMustSignUp, async (req, res) => {

   res.send(req.user)
  
})

router.post('/api/c/usr/join', userMustSignUp, currentUser,async (req, res) => {
   // username validation
   const { username } = req.body
   const username_aplhanumeric_only = /^([a-zA-Z0-9_-]+)$/
   const existing_username = await User.findOne({username: username})

   if(!username){
      return res.status(422).json({error: 'Username must be between 3 and 20 characters'})
   }

   if(!username_aplhanumeric_only.test(username)){
      return res.status(422).json({error:'Letters, numbers, dashes, and underscores only. Please try again without symbols.'})
   }
   
   if(username.length < 3 || username.length > 20){
      return res.status(422).json({error: 'Username must be between 3 and 20 characters'})
   }

   if(existing_username){
      return res.status(422).json({error: 'That username is already taken'})
   }

   // update the users username
   const user = await User.findOne({_id: req.currentUser.user._id})
   user.username = username
   user.modified_at = Date.now()
   user.new_register = false
   user.save()

   // Cache the user into redis 
   await redis.client.setex(user._id.toString(), 3600, JSON.stringify(user))

   // publish user:created event 
   new UserCreatedPublisher(nats.client).publish(req.currentUser)

   res.status(201).send(user)

})


router.get('/api/c/usr', currentUser, async (req, res) => {

     
   await redis.client.get(req.currentUser.user._id, (err, data) => {
      if(err) throw err
      console.log(data)
      res.send(JSON.parse(data))
   })
   
})


module.exports = router