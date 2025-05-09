const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware'); // JWT middleware
const { body, validationResult } = require("express-validator");


// Define endpoints
router.get('/', postController.getPosts);                 // GET all posts
router.get('/:id', postController.getPostById);              // GET post by ID
router.post(
    '/',
    [
        body("title")
            .trim()
            .notEmpty().withMessage("Title is required.")
            .isLength({ min: 5 }).withMessage("Title must be at least 5 characters long."),
        body("content")
            .trim()
            .notEmpty().withMessage("Content is required.")
            .isLength({ min: 20 }).withMessage("Content must be at least 20 characters long."),
        body("author")
            .notEmpty().withMessage("Author is required.")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ msg: errorMessages.join(" ") });
        }

        // ✅ Correct: Call the controller function
        postController.createPost(req, res);
    }
);
router.put('/:id', postController.updatePost);      // Update post by ID
router.delete('/:id', postController.deletePost);   // Delete post by ID

module.exports = router;
