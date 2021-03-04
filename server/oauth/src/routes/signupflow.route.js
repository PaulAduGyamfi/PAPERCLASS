const express = require('express')
const router = express.Router()
const { userMustSignUp } = require('../middleware/requireLogin') 

router.get('/signup',userMustSignUp,(req, res) => {
  res.send(req.user)
})

router.post('/signup', (req, res) => {
  
})

module.exports = router