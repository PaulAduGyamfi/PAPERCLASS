const express = require('express')
const router = express.Router()
const { requireLogin, userIsLoggedIn } = require('../middleware/requireLogin') 

// login/signup page route
router.get('/', userIsLoggedIn,(req, res)=>{
  res.send("THIS IS THE LOGIN HOMEPAGE")
})

// user homepage route
router.get('/feed', requireLogin,(req, res) => {
  res.send(req.user)
})

module.exports = router