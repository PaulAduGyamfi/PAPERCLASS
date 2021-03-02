const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({path: '../'})

const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session')
const connectDB = require('./config/db.config')
require('./config/passport.config')(passport)


// connect to MongoDB database
connectDB()

const app = express()

app.use(cors())
app.use(bodyParser.json())

// cookie encryotion and age
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

// initialize passport
app.use(passport.initialize()) 
app.use(passport.session())


app.use('/', require('./routes/auth.route'))
app.use('/auth', require('./routes/oauth.route'))

app.get('/test/pls', (req, res) => {
  res.send('HELLLOOOOOO')
})


app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port ${process.env.PORT}....`)
})