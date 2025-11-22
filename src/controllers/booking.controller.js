const bookingsCollection = require("../models/booking.model");
const { ObjectId } = require("mongodb");
const usersCollection = require("../models/user.model");

exports.getAllBooking = async (req, res) => {
    const result = await bookingsCollection.find().toArray();
    res.send(result);
}

exports.getUserSpecificBooking = async (req, res) => {
    const { email } = req.params;
    const result = await bookingsCollection.find({ email }).toArray();
    res.send(result);
}

exports.getSingleBooking = async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await bookingsCollection.findOne(query);
    res.send(result);
}

exports.getBookingForAdmin = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }
    const query = { email: email };
    const existingUser = await usersCollection.findOne(query);
    if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
    }
    const isAdmin = existingUser.role === "admin";
    if (!isAdmin) {
        return res.status(403).send({ message: "Unauthorized" });
    }
    const result = await bookingsCollection.find().toArray();
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

exports.updateSingleBooking = async (req, res) => {
    const { id } = req.params;
    const { email, bookingData } = req.body;
    const query = { _id: new ObjectId(id) };


    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const existingBooking = await bookingsCollection.findOne(query);
    if (!existingBooking) {
        return res.status(404).send({ message: "Booking not found" });
    }

    if (existingBooking.email !== email) {
        return res.status(403).send({ message: "Unauthorized: This is not your booking" });
    }

    const filter = {
        $set: bookingData
    };
    const options = {
        upsert: true
    }
    const result = await bookingsCollection.updateOne(query, filter, options);
    res.send(result);
}