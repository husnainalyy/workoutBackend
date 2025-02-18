const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    days: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Day"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
















