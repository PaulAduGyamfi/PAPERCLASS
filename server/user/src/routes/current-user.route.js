const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.get('/api/g/currentUser', async (req, res) => {
  if(!req.session?.jwt){
    return res.send({currentUser: null})
  }

  try {
    
    const payload = jwt.verify(
      req.session.jwt, 
      process.env.COOKIE_KEY
      )
    
      res.send({currentUser: payload})

  } catch (error) {
    res.send({currentUser: null})
  }

})

module.exports = router