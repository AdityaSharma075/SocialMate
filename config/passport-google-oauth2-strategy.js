const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviornment');

passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_call_back_url,
    },

    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log('eroor in passport starategy ', err);
          return;
        }
        if (user) {
          return done(null, user);
        }

        User.create(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          },
          function (errr, user) {
            if (err) {
              console.log(
                'eroor in creating user google passport starategy ',
                err
              );
              return;
            }

            return done(null, user);
          }
        );
      });
    }
  )
);

module.exports = passport;
