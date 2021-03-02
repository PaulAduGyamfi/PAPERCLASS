const express = require('express')
const router = express.Router()
const { requireLogin, checkGuest } = require('../middleware/requireLogin') 

// login/signup page route
router.get('/', checkGuest,(req, res)=>{
  res.send("THIS IS THE LOGIN HOMEPAGE")
})

// user homepage route
router.get('/feed', requireLogin,(req, res) => {
  res.send("THIS IS YOUR HOMEPAGE")
})

module.exports = router