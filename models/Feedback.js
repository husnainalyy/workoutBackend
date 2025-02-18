const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userLikes: {
        type: String
    },
    wantImprovements: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    others: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);