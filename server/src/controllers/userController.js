const User = require("../models/userModel");
const Note = require("../models/noteModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const normalizedUsername = username.toLowerCase().trim();

  const isUserExist = await User.findOne({
    usernameNormalized: normalizedUsername,
  }).exec(); // Removed unnecessary .select("+password").lean() for an existence check

  if (isUserExist) {
    return res.status(409).json({ message: "Username already exists." });
  }

  // FIX: Pass password RAW. Schema pre("save") hook will hash it exactly ONCE.
  const user = await User.create({
    username,
    password,
    roles,
  });

  return res
    .status(201)
    .json({ message: `User: ${user.username} created successfully.` });
};

const getUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found." });
  }
  return res
    .status(200)
    .json({ message: "Users retrieved successfully.", users });
};

const getUserById = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required." });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  return res
    .status(200)
    .json({ message: "User retrieved successfully.", user });
};

const updateUser = async (req, res) => {
  const { id, username, password, roles, active } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Fix case lookup stability using the normalized username variant
  if (username) {
    const normalizedUsername = username.toLowerCase().trim();
    const duplicateUser = await User.findOne({
      usernameNormalized: normalizedUsername,
    }).exec();

    if (duplicateUser && duplicateUser._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate username." });
    }
    user.username = username;
  }

  if (roles) user.roles = roles;
  if (typeof active === "boolean") user.active = active;

  // FIX: Assign password RAW. user.save() runs schema hook and hashes it ONCE.
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();
  return res.status(200).json({ message: `${updatedUser.username} updated.` });
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Check if user has associated notes before deleting
  const noteExists = await Note.findOne({ user: id }).exec();
  if (noteExists) {
    return res.status(400).json({ message: "User has assigned notes." });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  await user.deleteOne(); // Mongoose recommendation instead of structural findByIdAndDelete variations

  return res.status(200).json({
    message: `User: ${user.username} with ID: ${user._id} deleted successfully.`,
  });
};

module.exports = { createUser, getUsers, getUserById, deleteUser, updateUser };
