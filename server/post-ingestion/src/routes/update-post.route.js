const express = require('express')
const router = express.Router()
const { requireAuth, currentUser } = require('@pgcomm/common')

router.patch('/c/post/update', async (req, res) => {
  
})

module.exports = router