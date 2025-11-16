const usersCollection = require("../models/user.model");

const getAllUsers = async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
}

const addUser = async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
}

module.exports = {getAllUsers, addUser}