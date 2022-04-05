const express = require('express');

const router = express.Router();
const passport = require('passport');
const friendApi = require('../../../controllers/api/v1/friends_api');

router.post(
  '/create_friendship',
  passport.authenticate('jwt', { session: false }),
  friendApi.addFriend
);
router.post(
  '/remove_friendship',
  passport.authenticate('jwt', { session: false }),
  friendApi.removeFriend
);
router.get(
  '/fetch_user_friends',
  passport.authenticate('jwt', { session: false }),
  friendApi.fetchFriend
);

module.exports = router;
