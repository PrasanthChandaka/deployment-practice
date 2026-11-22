const messageModel = require("../models/messageModel");
const { cloudinary } = require("../configs/cloudinaryConfig");

// Controller
const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  const messages = await messageModel.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  });

  res.status(200).json(messages);
};

const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const { text, imageFile } = req.body;
  const senderId = req.user?.UserInfo?.id;

  // Combined content check to support images without text
  if (!receiverId || !senderId || (!text && !imageFile)) {
    return res
      .status(400)
      .json({ message: "Message content or recipient missing." });
  }

  let imageUrl = null;

  if (imageFile) {
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
      folder: "chat_messages",
    });
    imageUrl = uploadedImage.secure_url;
  }

  const newMessage = new messageModel({
    senderId,
    receiverId,
    text: text || "",
    imageFile: imageUrl,
  });

  await newMessage.save();

  res.status(200).json(newMessage);
};

module.exports = { getMessages, sendMessage };
