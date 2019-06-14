const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//grab user collection model
const User = mongoose.model('users');

//create token for user model instance from oauth flow below using mongo Id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//find user based on token when user calls api
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    //callback function after user acceps auth
    (accessToken, refreshToken, profile, done) => {
      //find user in db with googleId matching profileId
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //indicate adding user is done
          //pass in error (or null) and the user
          done(null, existingUser);
        } else {
          //create new user inside db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
