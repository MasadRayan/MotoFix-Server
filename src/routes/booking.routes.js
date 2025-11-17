const {getAllBooking, createBooking, getUserSpecificBooking} = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooking);
router.post("/", createBooking);
router.get("/:email", getUserSpecificBooking);

module.exports = router