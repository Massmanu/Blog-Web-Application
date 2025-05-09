const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const protect = require('../middleware/authMiddleware'); // JWT middleware

// Define endpoints
router.get('/', commentController.getAllComments);               // GET all comments
router.get('/:id', commentController.getCommentById);            // GET comment by ID
router.post('/', commentController.createComment);      // Create comment
router.put('/:id', commentController.updateComment);    // Update comment by ID
router.delete('/:id', commentController.deleteComment); // Delete comment by ID

module.exports = router;
