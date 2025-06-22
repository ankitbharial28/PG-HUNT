const express = require('express')
const routes = express.Router()
const upload = require("../middleware/multer")
const { loginAdmin } = require('../config/seed')

const { createPg, getAllPg, getPgById, updatePgById, deletePgById } = require("../api/pg/pgContoller")
const { createUser, loginUser, getAllUser, getUserById, updatedUser, deletedUser , SendOtp ,verifyOtp } = require("../api/user/userController")
const { createBooking, getAllBookings, getBookingById, deleteBooking , updateBooking, BookingStatus} = require("../api/booking/bookingController")
const { createComplaint, getAllComplaints, getComplaintById, updateComplaintStatus, deleteComplaint} = require("../api/complaint/complaintController")
const { createReview, getAllReviews, getReviewById, deleteReview, } = require("../api/review/reviewController")
const { createOwner,loginOwner, getAllOwners, getOwnerById, updateOwner, deleteOwner, } = require("../api/owner/ownerController")


// USER
routes.post("/createUser", createUser)
routes.post("/loginUser", loginUser)
routes.post("/getAllUser", getAllUser)
routes.post("/getUserById", getUserById)
routes.post("/updatedUser", updatedUser)
routes.post("/deletedUser", deletedUser)
routes.post("/verifyOtp", verifyOtp)
routes.post("/sendOtp", SendOtp)

// OWNER
routes.post("/createOwner", createOwner)
routes.post("/loginOwner", loginOwner)
routes.post("/getAllOwners", getAllOwners)
routes.post("/getAllOwners", getAllOwners)
routes.post("/getOwnerById", getOwnerById)
routes.post("/updateOwner", updateOwner)
routes.post("/deleteOwner", deleteOwner)
  


// PG
routes.post("/createpg", upload.single("image"), createPg)
routes.post("/getAllPg", upload.single("image"), getAllPg)
routes.post("/getPgById", getPgById)
routes.post("/updatePgById", upload.single('image'),updatePgById)
routes.post("/deletePgById", deletePgById)
    

// BOOKING

routes.post('/createBooking', createBooking)
routes.post('/getAllBookings', getAllBookings)
routes.post('/getBookingById', getBookingById)
routes.post('/deleteBooking', deleteBooking)
routes.post('/updateBooking', updateBooking)
routes.post('/BookingStatus', BookingStatus)

// COMPLAINT OR REVIEW

routes.post('/createComplaint', createComplaint)
routes.post('/getAllComplaints', getAllComplaints)
routes.post('/getComplaintById', getComplaintById)
routes.post('/updateComplaintStatus', updateComplaintStatus)
routes.post('/deleteComplaint', deleteComplaint)

// REVIEW 

routes.post('/createReview', createReview)
routes.post('/getAllReviews', getAllReviews)
routes.post('/getReviewById', getReviewById)
routes.post('/deleteReview', deleteReview)


//    createReview,
//     getAllReviews,
//     getReviewById,
//     deleteReview



module.exports = routes