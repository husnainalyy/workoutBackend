const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["lift", "cardio"],
        required: true
    },
    bodyGroup: {
        type: String,
        required: true,
        enum: ["Arms", "Back", "Chest", "Legs", "Abs"]
    },
    muscleGroup: {
        type: String,
        required: true
    },
    workoutType: {
        type: String
    },
    variation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variation",
        required: true
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
        required: true
    },
    limbOption: {
        type: String,
        enum: ["Single", "Both", "N/A"],
        default: "N/A"
    },
    notes: {
        type: String
    },
    sets: [{
        reps: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Entry", EntrySchema);