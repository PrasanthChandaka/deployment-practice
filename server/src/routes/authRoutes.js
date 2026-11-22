const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { loginLimiter } = require("../middlewares/loginLimiter");

router.post("/login", loginLimiter, authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logOut);

module.exports = router;
