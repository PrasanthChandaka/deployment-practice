const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    usernameNormalized: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    roles: {
      type: [
        {
          type: String,
          enum: ["Admin", "Manager", "Employee"],
          trim: true,
        },
      ],
      validate: {
        validator: (val) => val && val.length > 0,
        message: "At least one role is required",
      },
      default: ["Employee"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// FIX 1: Synchronous hook - DO NOT pass or call "next"
userSchema.pre("validate", function () {
  if (this.isModified("username") && this.username) {
    this.usernameNormalized = this.username.toLowerCase().trim();
  }
});

// FIX 2: Modern Async hook - return the promise chain natively without "next"
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  // Directly assign the resolved hash; Mongoose handles the async resolution under the hood
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
