const {client} = require("../config/db");

const usersCollection = client.db('Car-Doctor').collection('users');

module.exports = usersCollection;