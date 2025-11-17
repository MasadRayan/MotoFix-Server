const { client } = require("../config/db");

const bookingsCollection = client.db("Car_Doctor").collection("bookings");

module.exports = bookingsCollection