const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.profile
);

router.post(
  '/update/:id',
  passport.checkAuthentication,
  usersController.update
);
router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/user/sign-in' }),
  usersController.createSession
);
router.get('/sign-out', usersController.destroySession);

// router.get('/post/update' ,postController.update );
// router.get('/post/delete' ,postController.delete );
module.exports = router;
