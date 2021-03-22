const express = require('express')
const router = express.Router()
const postgres = require('../postgres')

router.post('/f/status/r', (req, res) => {
    const { id } = req.body

})

module.exports = router