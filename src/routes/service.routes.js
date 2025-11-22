const express = require("express");
const { getServices, createService, createManyServices, getSingleService, getAllServiceForAdmin, deleteService } = require("../controllers/service.controller");
const router = express.Router();

router.get("/", getServices);
router.get("/admin/:email", getAllServiceForAdmin);
router.get("/:id", getSingleService);
router.post("/", createService);
router.post("/many", createManyServices);
router.delete("/admin/:email/:id", deleteService);

module.exports = router;
