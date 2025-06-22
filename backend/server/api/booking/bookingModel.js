const mongoose = require("mongoose");

const bookingPgSchema = new mongoose.Schema({
    pgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PG",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assumes you have a User model
        required: true
    },
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "owner",  // Assumes you have a User model
        required: true
    },
    checkAt: {
        type: Date,
        required: true
    },
        status: {
        type: String,
        required: true,
        enum: ["pending",  "cancelled", "completed"],
        default: "pending"
    },

    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

const BookingPG = mongoose.models.BookingPG || mongoose.model("BookingPG", bookingPgSchema);

module.exports = BookingPG;



