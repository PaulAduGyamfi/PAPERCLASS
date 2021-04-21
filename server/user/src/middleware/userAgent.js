const userAgent = (req, res, next) => {
  req.session.useragent = {
     browser: req.useragent.browser,
     version: req.useragent.version,
     os: req.useragent.os,
     platform: req.useragent.platform
  }
  next()
}

module.exports = userAgent