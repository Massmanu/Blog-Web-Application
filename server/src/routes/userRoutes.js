const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware'); // JWT middleware

// Define endpoints
router.get('/', userController.getAllUsers);          // GET all users
router.get('/:id', userController.getUserById);         // GET user by ID
router.post('/', userController.createUser);                     // Create user
router.put('/:id', userController.updateUser);          // Update user by ID
router.delete('/:id', userController.deleteUser);       // Delete user by ID

module.exports = router;
