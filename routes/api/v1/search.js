const express = require('express');

const router = express.Router();
const passport = require('passport');
const searchApi = require('../../../controllers/api/v1/search_api');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  searchApi.search
);

module.exports = router;
