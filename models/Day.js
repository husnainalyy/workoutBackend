const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entry"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Day", DaySchema);