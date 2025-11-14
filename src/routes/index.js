const express = require("express");
const router = express.Router();

router.use("/service", require("./service.routes"));
// router.use("/user", require("./user.routes")); // future collections

module.exports = router;
