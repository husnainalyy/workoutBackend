const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    googleEventId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);