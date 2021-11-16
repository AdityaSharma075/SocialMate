const express = require('express');
const home_controller = require('../controllers/home_controller');

const router = express.Router();

router.get('/', home_controller.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;
