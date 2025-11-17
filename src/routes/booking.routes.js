const {getAllBooking, createBooking, getUserSpecificBooking, deletSingleBooking} = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooking);
router.post("/", createBooking);
router.get("/:email", getUserSpecificBooking);
router.delete("/:id", deletSingleBooking)

module.exports = router