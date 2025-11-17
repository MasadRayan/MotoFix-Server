const {getAllBooking, createBooking} = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooking);
router.post("/", createBooking);

module.exports = router