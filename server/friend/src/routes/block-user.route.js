const express = require('express')
const router = express.Router()
const postgres = require('../postgres')

router.post('/f/status/b', async (req, res) => {
    const { requester_id, addressee_id } = req.body

    const text = 'INSERT INTO relationship (requester_id, addressee_id, status_code, action_user_id, specified_date_time) VALUES ($1, $2, $3, $4, $5)'
    const values = [requester_id, addressee_id, '3', requester_id, 'now()']

    const exist_text = 'SELECT EXISTS(SELECT requester_id, addressee_id FROM relationship WHERE ((requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)))'
    const exist_values = [requester_id, addressee_id]

    const block_text = 'UPDATE relationship SET status_code = $3, action_user_id = $1, specified_date_time = $4 WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)'
    const block_values = [requester_id, addressee_id, '3', 'now()']

    try {
        const response = await postgres.client.query(exist_text, exist_values)

        if(response.rows[0].exists){
            const acceptQuery = await postgres.client.query(block_text, block_values)
            return res.status(200).send(acceptQuery)
        }
        else{
            const blockQuery = await postgres.client.query(text, values)
            return res.status(200).send(blockQuery)
        }
    } catch (err) {
        console.log(err.stack)
        res.status(422)
    }
    
})

module.exports = router