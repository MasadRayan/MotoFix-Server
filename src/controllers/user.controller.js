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

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await usersCollection.findOne({email: email});
    if(!user){
        return res.send({message: "User not found"});
    }
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
        return res.send({message: "Invalid password"});
    }
    res.send(user);
}

const postSocialLogin = async (req, res) => {
    const user = req.body;
    const {providerAccountId} = user;
    // validate user
    const oldUser = await usersCollection.findOne({providerAccountId: providerAccountId});
    if (!oldUser) {
        const result = await usersCollection.insertOne(user);
        res.send(result);
    }
    else {
        res.send(oldUser);
    }
}

module.exports = { getAllUsers, addUser, loginUser, postSocialLogin };