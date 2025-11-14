const {ObjectId} = require("mongodb");
const serviceCollection = require("../models/service.model");

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
