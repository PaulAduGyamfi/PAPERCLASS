const app = require('./app')
const connectDB = require('./config/db.config')

// connect to MongoDB database
connectDB()

app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port ${process.env.PORT}....`)
})