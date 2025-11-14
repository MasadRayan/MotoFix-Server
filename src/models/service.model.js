const { client } = require("../config/db");

const serviceCollection = client.db("Car_Doctor").collection("service");

module.exports = serviceCollection;
