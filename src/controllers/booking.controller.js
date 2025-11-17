const {bookingsCollection} = require("../models/booking.model");
const {ObjectId} = require("mongodb");


exports.getAllBooking =async (req, res) => {
    const result = await bookingsCollection.find().toArray();
    res.send(result);
}

exports.createBooking = async (req, res) => {
    const booking = req.body;
    const result = await bookingsCollection.insertOne(booking);
    res.send(result);
}