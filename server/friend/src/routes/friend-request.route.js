const express = require('express')
const router = express.Router()
const postgres = require('../postgres')

router.post('/f/status/r', async (req, res) => {
    const { requester_id, addressee_id } = req.body

    const text = 'INSERT INTO relationship (requester_id, addressee_id, status_code, action_user_id) VALUES ($1, $2, $3, $4)'
    const values = [requester_id, addressee_id, '0', requester_id]

    try {
        const queryRes = await postgres.client.query(text, values)
        res.status(200).json(queryRes)
        
    } catch (err) {
        console.log(err.stack)
        res.status(422)
    }
})

module.exports = router