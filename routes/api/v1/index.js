const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/friendship', require('./friend'));
router.use('/likes', require('./likes'));
router.use('/comments', require('./comments'));
router.use('/search', require('./search'));

module.exports = router;
