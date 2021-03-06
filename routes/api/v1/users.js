const express = require('express');

const router = express.Router();
const passport = require('passport');

const userApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', userApi.CreateSession);
router.post('/sign-up', userApi.SignUp);
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  userApi.editUser
);
router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  userApi.getUser
);

module.exports = router;
