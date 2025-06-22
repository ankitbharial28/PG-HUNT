const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
    userType: {
        type: String,
        enum: ["owner"],
        required: true,
        default: "owner"
    },
    address: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Owner = mongoose.models.Owner || mongoose.model("Owner", ownerSchema);
module.exports = Owner;
