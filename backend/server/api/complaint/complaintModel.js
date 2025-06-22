const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    pgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PG"
    },
    complaintText: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "resolved", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
