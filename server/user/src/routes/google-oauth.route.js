const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

// auth with google
router.get("/api/user/auth/google", passport.authenticate("google",{scope: ["profile", "email"],hd: ["stonybrook.edu"], prompt: ["select_account"]}))

// callback route for google to redirect to
router.get("/api/user/auth/google/redirect", passport.authenticate("google", {failureRedirect: '/'}), (req, res) => {
  const user = req.user
  const userJWT = jwt.sign({user}, process.env.COOKIE_KEY)

  req.session.jwt = userJWT

    // if it is user's first time logging in the redirect to sign up flow
   if(req.user.new_register){

     res.redirect('/signup')
   }else{
    
    // otherwise just send them to their homepage
     res.redirect('/feed')
   }
  }
)

// auth logout
router.post("/logout", (req, res) => {
  // handle with passport
  req.logout()
  res.redirect('/')
})


module.exports = router