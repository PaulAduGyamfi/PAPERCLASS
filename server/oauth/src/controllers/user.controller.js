const User = require('../models/User')

const createUser = async (accessToken, refreshToken, profile, done) => {
  const newUser = {
    google_id: profile.id,
    full_name: profile.displayName,
    first_name: profile.name.givenName,
    last_name: profile.name.familyName,
    email: profile.emails[0].value,
    profile_image_url: profile.photos[0].value
  }

  try{
    // search our database for an existing user
    let user = await User.findOne({ googleId: profile.id})
    if(user){
      // already have the user
      done(null, user)
    }else{

      // if user isn't in our database then add user to our database
      user = await User.create(newUser)
      done(null, user)
    }
  }catch(err){
    console.error(err)
  }
}

module.exports = { createUser }