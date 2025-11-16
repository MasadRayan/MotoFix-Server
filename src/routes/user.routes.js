const express = require("express");;
const router = express.Router();
const {getAllUsers, addUser, loginUser} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", loginUser);

module.exports = router