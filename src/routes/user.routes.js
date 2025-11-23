const express = require("express");;
const router = express.Router();
const {getAllUsers, addUser, loginUser, postSocialLogin, getUserRoale, makeAdmin} = require("../controllers/user.controller");
const { getUserOverview } = require("../controllers/userInfo.controller");

router.get("/allUser/:email", getAllUsers);
router.get("/role/:email", getUserRoale);
router.get("/overview/:email", getUserOverview);
router.post("/", addUser);
router.post("/login", loginUser);
router.post("/social-login", postSocialLogin);
router.patch("/makeAdmin/:email", makeAdmin);

module.exports = router;