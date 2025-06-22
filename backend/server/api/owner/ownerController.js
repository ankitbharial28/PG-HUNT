const Owner = require("./ownerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createOwner = async (req, res) => {
    try {
        const validation = [];
        const { name, email, password, phone, address, userType } = req.body;

        if (!name || typeof name !== "string") validation.push("Name is required and must be a string");
        if (!email || typeof email !== "string") validation.push("Email is required and must be a string");
        if (!password || typeof password !== "string") validation.push("Password is required and must be a string");
        if (!phone || typeof phone !== "string") validation.push("Phone number is required and must be a string");
        if (!address || typeof address !== "string") validation.push("Address is required and must be a string");
        if (!userType || typeof userType !== "string") validation.push("User type is required and must be a string");
        if (userType !== "owner") validation.push("User type must be 'owner'");

        if (validation.length > 0) {
            return res.json({
                status: 422,
                success: false,
                message: "Validation error",
                error: validation,
            });
        }

        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.json({
                status: 400,
                success: false,
                message: "Owner already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = new Owner({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            userType,
        });

        await owner.save();
        res.json({
            status: 201,
            success: true,
            message: "Owner created successfully",
            data: owner,
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const loginOwner = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.json({
                status: 404,
                success: false,
                message: "Owner not found",
            });
        }

        if (owner.userType !== userType) {
            return res.json({
                status: 401,
                success: false,
                message: "User type mismatch",
            });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.json({
                status: 401,
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { userId: owner._id, userType: owner.userType },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.json({
            status: 200,
            success: true,
            message: "Login successful",
            token,
            user: {
                id: owner._id,
                email: owner.email,
                userType: owner.userType,
            },
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.json({
            status: 200,
            success: true,
            message: "Owners fetched successfully",
            data: owners,
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const getOwnerById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "ID is required",
            });
        }

        const owner = await Owner.findById(id);
        if (!owner) {
            return res.json({
                status: 404,
                success: false,
                message: "Owner not found",
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Owner fetched successfully",
            data: owner,
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const updateOwner = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "ID is required",
            });
        }

        const updatedOwner = await Owner.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedOwner) {
            return res.json({
                status: 404,
                success: false,
                message: "Owner not found",
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Owner updated successfully",
            data: updatedOwner,
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const deleteOwner = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "ID is required",
            });
        }

        const deletedOwner = await Owner.findByIdAndDelete(id);
        if (!deletedOwner) {
            return res.json({
                status: 404,
                success: false,
                message: "Owner not found",
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Owner deleted successfully",
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

module.exports = {
    createOwner,
    loginOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
};
