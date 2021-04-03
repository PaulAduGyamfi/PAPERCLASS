const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { currentUser, requireAuth } = require('@pgcomm/common')
const redis = require('../redis')

router.get('/g/post/timeline/user/:id', async (req, res) => {


})

module.exports = router