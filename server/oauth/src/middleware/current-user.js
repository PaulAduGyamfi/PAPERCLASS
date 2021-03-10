const jwt =  require('jsonwebtoken')

const currentUser = (req, res, next) => {
  if(!req.session || !req.session.jwt){
    return next()
  }
  
  try {
    const payload = jwt.verify(req.session.jwt, process.env.COOKIE_KEY)
    req.currentUser = payload
  } catch (error) {
    
  }
  next()
}