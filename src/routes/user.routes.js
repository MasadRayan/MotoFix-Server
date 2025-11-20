const express = require("express");;
const router = express.Router();
const {getAllUsers, addUser, loginUser, postSocialLogin, getUserRoale} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/role/:email", getUserRoale);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/social-login", postSocialLogin);


module.exports = router