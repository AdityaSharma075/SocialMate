const User = require('../../../models/user');
const env = require('../../../config/enviornment');

const jwt = require('jsonwebtoken');

module.exports.CreateSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: 'Invalid Username and password',
      });
    }
    return res.json(200, {
      message: 'LOGIN SUCCESSFULL HERE IS YOUR TOKEN KEEP IT SAFE!',
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret),
        user: { name: user.name, email: user.email, id: user._id },
      },
    });
  } catch (error) {
    if (error) {
      console.log('******Error ******', error);
      return res.json(500, {
        message: ' Internal Server Error',
      });
    }
  }
};
module.exports.SignUp = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json(422, {
        message: 'User Already Present',
      });
    }
    if (req.body.confirm_password != req.body.password) {
      return res.json(422, {
        message: 'password not match',
      });
    }
    user = await User.create(req.body);
    return res.json(200, {
      message: 'User Created Succesfully you can login now!',
    });
  } catch (error) {
    if (error) {
      console.log('******Error ******', error);
      return res.json(500, {
        message: ' Internal Server Error',
      });
    }
  }
};
