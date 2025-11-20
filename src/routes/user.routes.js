const express = require("express");;
const router = express.Router();
const {getAllUsers, addUser, loginUser, postSocialLogin, getUserRoale, makeAdmin} = require("../controllers/user.controller");

router.get("/allUser/:email", getAllUsers);
router.get("/role/:email", getUserRoale);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/social-login", postSocialLogin);
router.patch("/makeAdmin/:email", makeAdmin);

module.exports = router;