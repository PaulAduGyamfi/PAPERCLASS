const express = require('express')
const router = express.Router()
const postgres = require('../postgres')

router.post('/f/status/d', async (req, res) => {
    const { requester_id, addressee_id } = req.body

    const exist_text = 'SELECT EXISTS(SELECT requester_id, addressee_id FROM relationship WHERE ((requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)) AND status_code = $3)'
    const exist_values = [requester_id, addressee_id, '0']

    const decline_text = 'UPDATE relationship SET status_code = $3, action_user_id = $2, specified_date_time = $4 WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)'
    const decline_values = [requester_id, addressee_id, '2', 'now()']

    try {
        const response = await postgres.client.query(exist_text, exist_values)

        if(response.rows[0].exists){
            const declineQuery = await postgres.client.query(decline_text, decline_values)
            return res.status(200).send(declineQuery)
        }
        else{
            return res.status(422).json({error: 'Does not exist in DB'})
        }
    } catch (err) {
        console.log(err.stack)
        res.status(422)
    }
    
})

module.exports = router