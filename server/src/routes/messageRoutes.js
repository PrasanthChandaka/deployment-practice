const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/verifyJWT");
const router = express.Router();

router.get("/:receiverId/:senderId", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessage);

module.exports = router;
