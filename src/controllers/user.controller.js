const usersCollection = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
}

const addUser = async (req, res) => {
    const user = req.body;
    const { name, email, password } = user;

    // validation for all fields
    if (!name || !email || !password) {
        return res.send({ message: "All fields are required" });
    }

    // validation of smae user
    const oldUser = await usersCollection.findOne({ email: user.email });
    if (oldUser) {
        return res.send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    const result = await usersCollection.insertOne(user);
    res.send(result);



}

module.exports = { getAllUsers, addUser }