const serviceCollection = require("../models/service.model");

exports.getServices = async (req, res) => {
    const result = await serviceCollection.find().toArray();
    res.send(result);
};

exports.createService = async (req, res) => {
    const service = req.body;
    const result = await serviceCollection.insertOne(service);
    res.send(result);
};
