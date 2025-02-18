const Feedback = require("../models/Feedback.js");
const User = require("../models/User.js");

// Submit feedback
const createFeedback = async (req, res) => {
    try {
        const { userLikes, wantImprovements, rating, others } = req.body;

        // Get authenticated user
        const user = await User.findById(req.user._id);

        // Validate rating
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const newFeedback = new Feedback({
            user: user._id,
            userLikes,
            wantImprovements,
            rating,
            others
        });

        await newFeedback.save();

        res.status(201).json({
            success: true,
            data: newFeedback,
            message: "Feedback submitted successfully"
        });
    } catch (error) {
        console.error("Feedback submission error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get user's feedback history
const getMyFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            data: feedbacks
        });
    } catch (error) {
        console.error("Get feedback error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createFeedback,
    getMyFeedback
};