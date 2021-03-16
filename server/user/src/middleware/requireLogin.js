module.exports = {
  requireLogin: (req, res, next) => {
    // check if user is logged in
    if(req.isAuthenticated() && !req.user.new_register){
      return next()
    }else if(req.isAuthenticated() && req.user.new_register){
      res.redirect('/api/user/signup')
    }else{
      // if user is not logged in send them back to login/sign up page
      res.redirect('/api/user/')
    }
  },
  userIsLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      // if user is logged in redirect them to their homepage
      res.redirect('/api/user/feed')
    }else{
      return next()
    }
  },
  userMustSignUp: (req, res,next) => {
    if(req.isAuthenticated() && req.user.new_register){
      return next()
    }
    else if(req.isAuthenticated() && !req.user.new_register){
      res.redirect('/api/user/feed')
    }
    else{
      res.redirect('/api/user')
    }
  }
}