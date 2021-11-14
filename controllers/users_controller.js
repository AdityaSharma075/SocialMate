const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User | Profile",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "User | SignUp",
  });
};
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "User | SignIn",
  });
};
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Eroor in finding in the DataBase");
    }

    if (!user) {
      User.create(req.body, function (err) {
        if (err) {
          console.log("Eroor in Creting Data in DataBase");
        }

        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
