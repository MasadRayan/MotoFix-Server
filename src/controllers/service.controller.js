const {ObjectId} = require("mongodb");
const serviceCollection = require("../models/service.model");
const usersCollection = require("../models/user.model");

exports.getServices = async (req, res) => {
    const result = await serviceCollection.find().toArray();
    res.send(result);
};

exports.getSingleService = async (req, res) => {
    const {id} = req.params;
    const query = {_id : id};
    const result = await serviceCollection.findOne(query);
    res.send(result)
};

exports.getAllServiceForAdmin = async (req, res) => {
    const {email} = req.params;
    const query = {email:email};
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }
    const userExists = await usersCollection.findOne(query);
    if (!userExists) {
        return res.status(404).send({ message: "User not found" });
    }

    const usAdmin = userExists.role === "admin";
    if (!usAdmin) {
        return res.status(403).send({ message: "Unauthorized" });
    }
    const result = await serviceCollection.find().toArray();
    res.send(result);
}

exports.createService = async (req, res) => {
    const service = req.body;
    const result = await serviceCollection.insertOne(service);
    res.send(result);
};

exports.createManyServices = async (req, res) => {
    const service = req.body;
    const result = await serviceCollection.insertMany(service);
    res.send(result);
};
