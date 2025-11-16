const express = require("express");;
const router = express.Router();
const {getAllUsers, addUser, loginUser, postSocialLogin} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/social-login", postSocialLogin);


module.exports = router