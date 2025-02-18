const mongoose = require("mongoose");

const ExerciseCatalogSchema = new mongoose.Schema({
    bodyGroup: {
        type: String,
        required: true,
        enum: ["Arms", "Back", "Chest", "Legs", "Abs"]
    },
    muscleGroups: {
        type: [String],
        required: true
    },
    // Optional: Predefined workout types (e.g., "Hammer Curls" for Arms)
    workoutTypes: [String]
});

module.exports = mongoose.model("ExerciseCatalog", ExerciseCatalogSchema);