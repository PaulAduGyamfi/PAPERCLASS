const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')

router.get('/g/post/timeline/home', async (req, res) => {
  
})

module.exports = router