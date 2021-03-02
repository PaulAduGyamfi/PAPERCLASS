module.exports = {
  requireLogin: (req, res, next) => {
    // check if user is logged in
    if(req.isAuthenticated()){
      return next()
    }else{
      // if user is not logged in send them back to login/sign up page
      res.redirect('/')
    }
  },
  checkGuest: (req, res, next) => {
    if(req.isAuthenticated()){
      // if user is logged in redirect them to their homepage
      res.redirect('/feed')
    }else{
      return next()
    }
  },
}