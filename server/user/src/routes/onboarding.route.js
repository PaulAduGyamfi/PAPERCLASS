const express = require('express')
const router = express.Router()
const { userMustSignUp } = require('../middleware/requireLogin') 
const { UserCreatedPublisher } = require('../events/publishers/user-created-publisher')
const nats =  require('../nats')
const { currentUser, requireAuth } = require('@pgcomm/common')
const User = require('../models/User')


router.get('/signup',userMustSignUp, async (req, res) => {

   res.send(req.user)
  
})

router.post('/api/user/username', async (req, res) => {
   
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

})


router.post('/api/user/join', currentUser, requireAuth, (req, res) => {

   // publish user:created event 
   new UserCreatedPublisher(nats.client).publish(req.currentUser)

})


module.exports = router