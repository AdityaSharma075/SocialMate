const User = require('../../../models/user');
const env = require('../../../config/enviornment');

const jwt = require('jsonwebtoken');

module.exports.CreateSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        fail: true,
        message: 'Invalid Username and password',
      });
    }
    return res.json(200, {
      success: true,
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
        fail: true,
        message: 'User Already Present',
      });
    }
    if (req.body.confirm_password != req.body.password) {
      return res.json(422, {
        fail: true,
        message: 'password not match',
      });
    }
    user = await User.create(req.body);
    return res.json(200, {
      success: true,
      message: 'User Created Succesfully you can login now!',
    });
  } catch (error) {
    if (error) {
      console.log('******Error ******', error);
      return res.json(500, {
        fail: true,
        message: ' Internal Server Error',
      });
    }
  }
};
module.exports.editUser = async function (req, res) {
  try {
    // console.log('THis is req => : ', req.body);
    let user = await User.findById(req.body._id);

    user.name = req.body.name;
    if (req.body.password) {
      if (req.body.password == req.body.confirm_password)
        user.password = req.body.password;
    }
    user.save();
    return res.status(200).json({
      success: true,
      message: 'User Updated',
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret),
        user: { name: user.name, email: user.email, id: user._id },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.getUser = async function (req, res) {
  try {
    let user = await User.findById(req.params.user_id);
    // console.log('ageggggggggg');
    return res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
