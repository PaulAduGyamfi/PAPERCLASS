const express = require('express')
const router = express.Router()
const { requireAuth, currentUser } = require('@pgcomm/common')

router.patch('', (req, res) => {

})

module.exports = router