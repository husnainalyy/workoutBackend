const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js');
const authenticateUserByClerkId = require('../middlewares/authenticateUserByClerkId.js');




// Apply authentication middleware to all feedback routes
router.use(authenticateUserByClerkId);

// Create feedback
router.post('/', feedbackController.createFeedback);

// Get user's feedback history
router.get('/my-feedback', feedbackController.getMyFeedback);

module.exports = router;

