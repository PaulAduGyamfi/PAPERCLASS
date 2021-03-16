const express = require('express')
const router = express.Router()
const { requireLogin, userIsLoggedIn } = require('../middleware/requireLogin') 

// login/signup page route
router.get('/api/user', userIsLoggedIn,(req, res)=>{
  res.send("THIS IS THE LOGIN HOMEPAGE")
})

// user homepage route
router.get('/api/user/feed', requireLogin,(req, res) => {
  res.send("THIS IS YOUR HOMEPAGE")
})

module.exports = router