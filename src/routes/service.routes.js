const express = require("express");
const { getServices, createService, createManyServices } = require("../controllers/service.controller");
const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.post("/many", createManyServices);

module.exports = router;
