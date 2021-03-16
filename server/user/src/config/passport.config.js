const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const userController = require('../controllers/user.controller')



module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      // settings for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/user/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
     
      // verifies that user account is authentic and is a stonybrook.edu email
      if(profile._json.email_verified === true && profile._json.hd === 'stonybrook.edu'){
        
        // creates and adds user to database if user is new, otherwise get user
        userController.createUser(accessToken, refreshToken, profile, done)
        
      }
      else{
        // if user account can't be authenticated or not a stonybrook.edu email send error
        done(null, false, {message: "Invalid Account"})
      }
    })
  )
  
  // recieves user and gets information from it to stuff in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  // when cookie come back from browser take the id stored in it
  passport.deserializeUser((id, done) => {
    // find user in database from id
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

}