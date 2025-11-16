const {client} = require("../config/db");

const usersCollection = client.db("Car_Doctor").collection("users");

module.exports = usersCollection;