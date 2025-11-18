const {getAllBooking, createBooking, getUserSpecificBooking, deletSingleBooking, getSingleBooking} = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooking);
router.get("/user/:email", getUserSpecificBooking);
router.get("/single/:id", getSingleBooking);
router.post("/", createBooking);
router.delete("/:id", deletSingleBooking)

module.exports = router