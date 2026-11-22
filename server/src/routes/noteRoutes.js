const express = require("express");
const router = express.Router();
const notesController = require("../controllers/noteController");
const { verifyToken } = require("../middlewares/verifyJWT");

router.get("/", verifyToken, notesController.getAllNotes);
router.post("/create", verifyToken, notesController.createNote);
router.put("/update", verifyToken, notesController.updateNote);
router.delete("/delete", verifyToken, notesController.deleteNote);
module.exports = router;
