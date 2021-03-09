const express = require('express')
const router = express.Router()

router.get('/post', (req,res)=>{
  res.send('POST SERVICE GON BE LITTTTT')
})

module.exports = router
