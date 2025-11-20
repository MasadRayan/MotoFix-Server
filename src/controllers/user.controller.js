const usersCollection = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    const { email } = req.params;
    const query = { email: email };
    if(!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const existingUser = await usersCollection.findOne(query);
    if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
    }

    if (existingUser.role !== "admin") {
        return res.status(403).send({ message: "Unauthorized" });
    }
    const result = await usersCollection.find().toArray();
    res.send(result);
}

const getUserRoale = async (req, res) => {
    const {email} = req.params;
    
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const getUser = await usersCollection.findOne({ email: email });
    if (!getUser) {
        return res.status(404).send({ message: "User not found" });
    }
    res.send({ role: getUser.role });
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


module.exports = { getAllUsers, addUser, loginUser, postSocialLogin, getUserRoale };