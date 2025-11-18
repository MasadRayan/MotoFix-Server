const bookingsCollection = require("../models/booking.model");
const { ObjectId } = require("mongodb");

exports.getAllBooking = async (req, res) => {
    const result = await bookingsCollection.find().toArray();
    res.send(result);
}

exports.getUserSpecificBooking = async (req, res) => {
    const { email } = req.params;
    const result = await bookingsCollection.find({ email }).toArray();
    res.send(result);
}

exports.getSingleBooking = async (req,res) => {
    const {id} = req.params;
    const query = {_id : new ObjectId(id)};
    const result =await bookingsCollection.findOne(query);
    res.send(result);
}

exports.createBooking = async (req, res) => {
    const booking = req.body;
    const result = await bookingsCollection.insertOne(booking);
    res.send(result);
}


exports.deletSingleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { email: loggedInEmail } = req.body;
        if (!loggedInEmail) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        // find the booking first
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

        if (!booking) {
            return res.status(404).send({ message: "Booking not found" });
        }

        // check if the logged in user is the owner of the booking
        if (booking.email !== loggedInEmail) {
            return res.status(403).send({ message: "Unauthorized: This is not your booking" });
        }

        const query = { _id: new ObjectId(id) };
        const result = await bookingsCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}