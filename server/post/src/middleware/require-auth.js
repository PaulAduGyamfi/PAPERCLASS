const requireAuth = (req, res, next) => {
  if(!req.currentUser){
    return res.redirect('/')
  }
  next()
}

module.exports = { requireAuth }