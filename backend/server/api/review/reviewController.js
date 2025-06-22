const Review = require("./reviewModel");

// Create review
const createReview = async (req, res) => {
    try {
        const validation = [];
        const { userId, pgId, rating, reviewText } = req.body;
        console.log(userId)
        console.log(pgId)
        console.log(rating)
        console.log(reviewText)

        if (!userId) validation.push("userId is required");
        if (!pgId) validation.push("pgId is required");
        if (!rating) {
            validation.push("rating is required and must be between 1 and 5");
        }

        if (validation.length > 0) {
            return res.json({
                status: 400,
                success: false,
                message: "Validation error",
                error: validation
            });
        }

        const newReview = new Review({ userId, pgId, rating, reviewText });
        await newReview.save();

        res.json({
            status: 201,
            success: true,
            message: "Review created successfully",
            data: newReview
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

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userId pgId");
        res.json({
            status: 200,
            success: true,
            message: "All reviews fetched successfully",
            data: reviews
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

// Get review by ID
const getReviewById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "id is required"
            });
        }

        const review = await Review.findById(id).populate("userId pgId");
        if (!review) {
            return res.json({
                status: 404,
                success: false,
                message: "Review not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Review found",
            data: review
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

// Delete review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "id is required"
            });
        }

        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.json({
                status: 404,
                success: false,
                message: "Review not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Review deleted successfully",
            data: review
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
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview
};
