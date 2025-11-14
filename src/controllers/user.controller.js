const usersCollection = require("../models/users.model");

exports.getUser = async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
}

exports.postUser = async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result)
}