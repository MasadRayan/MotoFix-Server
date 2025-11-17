const express = require("express");
const router = express.Router();

router.use("/service", require("./service.routes"));
router.use('/user', require('./user.routes'));
router.use("/booking", require("./booking.routes"));

module.exports = router;
