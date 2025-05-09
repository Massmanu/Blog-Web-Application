const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));    // Create userRoutes.js
router.use('/posts', require('./postRoutes'));      // Create postRoutes.js
router.use('/comments', require('./commentRoutes'));  // Create commentRoutes.js
router.use('/auth', require('./auth'))
module.exports = router;
