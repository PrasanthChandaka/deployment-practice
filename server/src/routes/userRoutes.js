const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validate } = require("../middlewares/validate");
const {
  userRegistrationSchema,
  userUpdationSchema,
} = require("../validations/userValidation");

router.route("/").get(userController.getUsers);
router.post(
  "/register",
  validate(userRegistrationSchema),
  userController.createUser,
);
router.put("/update", validate(userUpdationSchema), userController.updateUser);
router.delete("/delete", userController.deleteUser);
router.get("/getuser", userController.getUserById);

module.exports = router;
