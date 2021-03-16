const express = require('express')
const router = express.Router()
const { userMustSignUp } = require('../middleware/requireLogin') 
const { UserCreatedPublisher } = require('../events/publishers/user-created-publisher')
const nats =  require('../nats')

router.get('/signup',userMustSignUp, async (req, res) => {
// await Program.create({
//     programName: "Comp Sci",
//     programDescription: "coding tings"
//   })
//   const temp = []
//   const findmajor = await Program.findOne({programName: "Comp Sci"})
//   temp.push(findmajor)
//   await User.findOneAndUpdate({googleId:req.user.googleId}, {
//     programsFollowing: temp,
//     newRegister: true
//   })
//   console.log(findmajor)
//   console.log(req.user)
   res.send(req.user)
  
})

router.post('/api/user/signup', (req, res) => {

   // save user profile changes

   new UserCreatedPublisher(nats.client).publish(req.user)

})


module.exports = router