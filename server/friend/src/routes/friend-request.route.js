const express = require('express')
const router = express.Router()
const postgres = require('../postgres')

router.post('/f/status/r', async (req, res) => {
    const { requester_id, addressee_id } = req.body

    const text = 'INSERT INTO relationship (requester_id, addressee_id, status_code, action_user_id, specified_date_time) VALUES ($1, $2, $3, $4, $5)'
    const values = [requester_id, addressee_id, '0', requester_id, 'now()']

    const exist_text = 'SELECT EXISTS(SELECT requester_id, addressee_id FROM relationship WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1))'
    const exist_values = [requester_id, addressee_id]

    const resend_text = 'UPDATE relationship SET status_code = $3, specified_date_time = $4 WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)'
    const resend_values = [requester_id, addressee_id, '0', 'now()']

    try {
        // QUERY to check if a row with specific values already exists in our table
        const response = await postgres.client.query(exist_text, exist_values)
        
        if(response.rows[0].exists){
            // If user pair exist in our table then resend friend request by updating status and updating date
            const resendQuery = await postgres.client.query(resend_text, resend_values)
           return res.send(resendQuery)
        }

        // Else pair was never in table then insert new user pair into the table with a status of 0
        const queryRes = await postgres.client.query(text, values)
        res.status(200).json(queryRes)
        
    } catch (err) {
        console.log(err.stack)
        res.status(422)
    }
})

module.exports = router