const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()



const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/programs', require('./routes/program.route'))


module.exports = app