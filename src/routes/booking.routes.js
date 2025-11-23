const {getAllBooking, createBooking, getUserSpecificBooking, deletSingleBooking, getSingleBooking, updateSingleBooking , getBookingForAdmin, updateBookingStatusByAdmin} = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooking);
router.get("/user/:email", getUserSpecificBooking);
router.get("/single/:id", getSingleBooking);
router.get("/admin/:email", getBookingForAdmin);
router.post("/", createBooking);
router.delete("/:id", deletSingleBooking);
router.patch("/bookingUpdate/:id", updateSingleBooking);
router.patch("/bookingUpdate/:id/:email", updateBookingStatusByAdmin);

module.exports = router