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



/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the feedback
 *         user:
 *           type: string
 *           description: The user id who submitted the feedback (authenticated user) from clerk id
 *         userLikes:
 *           type: string
 *           description: Feedback on what the user likes about the service
 *         wantImprovements:
 *           type: string
 *           description: Feedback on what the user wants improved in the service
 *         rating:
 *           type: number
 *           description: Rating provided by the user (1 to 5) where 1 is the lowest and 5 is the highest
 *         others:
 *           type: string
 *           description: Additional feedback details provided by the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the feedback was submitted
 */

/**
 * @swagger
 * /api/feedback/:
 *   post:
 *     summary: Create feedback
 *     description: Submit feedback for the authenticated user.
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userLikes:
 *                 type: string
 *               wantImprovements:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               others:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request. Rating is out of allowed range or required fields are missing.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/feedback/my-feedback:
 *   get:
 *     summary: Get user's feedback history
 *     description: Retrieve all feedback entries submitted by the authenticated user.
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Feedback history retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *       500:
 *         description: Server error.
 */
