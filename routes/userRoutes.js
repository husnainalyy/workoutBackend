const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticateUserByClerkId = require('../Middlewares/authenticateUserByClerkId.js');

// Apply middleware only to specific routes
router.use(authenticateUserByClerkId);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/', userController.deleteUser);
module.exports = router;