const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { currentUser, requireAuth } = require('@pgcomm/common')

router.get('/api/g/usr/:id', currentUser, requireAuth, async (req, res) => {
  const user = await User.findOne({_id: req.params.id})

  if(!user){
    return res.sendStatus(404)
  }

  res.send(user)
})

module.exports = router