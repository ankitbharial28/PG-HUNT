const Complaint = require("./complaintModel");

// Create complaint
const createComplaint = async (req, res) => {
    try {
        const { userId, pgId, complaintText } = req.body;
        const validation = [];

        if (!userId) validation.push("userId is required");
        if (!pgId) validation.push("pgId is required");
        if (!complaintText || typeof complaintText !== "string") {
            validation.push("complaintText is required and must be a string");
        }

        if (validation.length > 0) {
            return res.json({
                status: 400,
                success: false,
                message: "Validation error",
                error: validation
            });
        }

        const newComplaint = new Complaint({ userId, pgId, complaintText });
        await newComplaint.save();

        res.json({
            status: 201,
            success: true,
            message: "Complaint created successfully",
            data: newComplaint
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("userId pgId");
        res.json({
            status: 200,
            success: true,
            message: "All complaints fetched successfully",
            data: complaints
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "id is required"
            });
        }

        const complaint = await Complaint.findById(id).populate("userId pgId");
        if (!complaint) {
            return res.json({
                status: 404,
                success: false,
                message: "Complaint not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Complaint found",
            data: complaint
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.json({
                status: 400,
                success: false,
                message: "id and status are required"
            });
        }

        if (!["pending", "resolved", "rejected"].includes(status)) {
            return res.json({
                status: 400,
                success: false,
                message: "Invalid status value"
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!complaint) {
            return res.json({
                status: 404,
                success: false,
                message: "Complaint not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Complaint status updated",
            data: complaint
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// Delete complaint
const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "id is required"
            });
        }

        const complaint = await Complaint.findByIdAndDelete(id);
        if (!complaint) {
            return res.json({
                status: 404,
                success: false,
                message: "Complaint not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Complaint deleted successfully",
            data: complaint
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint
};
