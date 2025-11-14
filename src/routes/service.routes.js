const express = require("express");
const { getServices, createService } = require("../controllers/service.controller");
const router = express.Router();

router.get("/", getServices);
router.post("/", createService);

module.exports = router;
