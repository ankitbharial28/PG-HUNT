const mongoose = require("mongoose");
const BookingPG = require("./bookingModel");

// Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new booking with validation
const createBooking = async (req, res) => {
  try {
    const { pgId, userId, ownerId, checkAt, status } = req.body;

    // Basic validation
    if (!pgId || !userId || !ownerId || !checkAt) {
      return res.status(400).json({
        message: "pgId, userId, ownerId, and checkAt are required."
      });
    }

    if (!isValidObjectId(pgId)) {
      return res.status(400).json({ message: "Invalid pgId." });
    }

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    if (!isValidObjectId(ownerId)) {
      return res.status(400).json({ message: "Invalid ownerId." });
    }

    const parsedCheckAt = new Date(checkAt);
    if (isNaN(parsedCheckAt.getTime())) {
      return res.status(400).json({ message: "Invalid checkAt date." });
    }

    const booking = new BookingPG({
      pgId,
      userId,
      ownerId,
      checkAt: parsedCheckAt,
      status: status || "pending"
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully.",
      data: booking
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingPG.find()
      .populate("pgId")
      .populate("userId")
      .populate("ownerId");

    res.status(200).json({ data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking ID." });
    }

    const booking = await BookingPG.findById(id)
      .populate("pgId")
      .populate("userId")
      .populate("ownerId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete booking by ID
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking ID." });
    }

    const deletedBooking = await BookingPG.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking deleted successfully.",
      data: deletedBooking
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const { id, ...data } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Booking ID is required."
      });
    }

    const existingBooking = await BookingPG.findById(id);
    if (!existingBooking) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Booking not found."
      });
    }

    const updatedBooking = await BookingPG.findByIdAndUpdate(id, data, {
      new: true
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Booking updated successfully.",
      data: updatedBooking
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error.",
      error: err.message
    });
  }
};

// Update Booking Status
const BookingStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "ID and status are required." });
    }

    const updatedBooking = await BookingPG.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Booking not found."
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Booking status updated successfully.",
      data: updatedBooking
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
  BookingStatus
};
