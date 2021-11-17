const express = require('express');

const router = express.Router();

const userApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', userApi.CreateSession);

module.exports = router;
