const User = require('../models/user');
const passport = require('passport');

module.exports.profile = function (req, res) {
  return res.render('user_profile', {
    title: 'User | Profile',
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    title: 'User | SignUp',
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: 'User | SignIn',
  });
};
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Eroor in finding in the DataBase');
    }

    if (!user) {
      User.create(req.body, function (err) {
        if (err) {
          console.log('Eroor in Creting Data in DataBase');
        }

        return res.redirect('/users/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect('/');
};
