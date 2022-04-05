const express = require('express');
const home_controller = require('../controllers/home_controller');

const router = express.Router();

router.get('/', home_controller.home);
router.use('/user', require('./user'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));
router.use('/friends', require('./friends'));
module.exports = router;
