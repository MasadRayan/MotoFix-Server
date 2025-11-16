const express = require("express");
const router = express.Router();

router.use("/service", require("./service.routes"));

module.exports = router;
