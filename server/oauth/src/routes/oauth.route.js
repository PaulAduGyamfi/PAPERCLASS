const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')

// auth with google
router.get("/google", passport.authenticate("google",{scope: ["profile", "email"],hd: ["stonybrook.edu"], prompt: ["select_account"]}))

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google", {failureRedirect: '/'}),
  (req, res) => {
    
    // if it is user's first time logging in the redirect to sign up flow
   if(req.user.newRegister){
     res.redirect('/auth/signup')
   }else{
    
    // otherwise just send them to their homepage
     res.redirect('/feed')
   }
  }
)

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout()
  res.redirect('/')
})


module.exports = router