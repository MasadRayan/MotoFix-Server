const express = require("express");
const { getServices, createService, createManyServices, getSingleService } = require("../controllers/service.controller");
const router = express.Router();

router.get("/", getServices);
router.get("/:id", getSingleService);
router.post("/", createService);
router.post("/many", createManyServices);

module.exports = router;
