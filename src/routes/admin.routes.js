const express = require("express");
const router = express.Router();

const { getAdminOverview } = require("../controllers/admin.controller");

router.get("/overview/:email", getAdminOverview);

module.exports = router;
