const bookingsCollection = require("../models/booking.model");
const {ObjectId} = require("mongodb");

exports.getAllBooking = async (req, res) => {
    const result = await bookingsCollection.find().toArray();
    res.send(result);
}

exports.getUserSpecificBooking = async (req, res) => {
    const {email} = req.params;
    const result = await bookingsCollection.find({email}).toArray();
    res.send(result);
}

exports.createBooking = async (req, res) => {
    const booking = req.body;
    const result = await bookingsCollection.insertOne(booking);
    res.send(result);
}


exports.deletSingleBooking = async (req, res) => {
    const {id} = req.params;
    const query = {_id : new ObjectId(id)};
    const result = await bookingsCollection.deleteOne(query);
    res.send(result);
}