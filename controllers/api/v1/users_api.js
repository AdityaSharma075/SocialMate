const User = require('../../../models/user');

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
        token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '10000000000' }),
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
