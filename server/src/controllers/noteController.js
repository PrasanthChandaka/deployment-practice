const { boolean } = require("zod");
const Note = require("../models/noteModel");
const userModel = require("../models/userModel");

const getAllNotes = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "ID is required." });
  }

  const notes = await Note.find({ user: id }).lean();

  if (!notes) {
    return res.status(404).json({ message: "No notes found." });
  }

  res.status(200).json({ notes: notes });
};

const createNote = async (req, res) => {
  const { user, title, description } = req.body;
  if (!user || !title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicateTitle = await Note.findOne({ title }).lean().exec();

  if (duplicateTitle) {
    return res.status(409).json({ message: "Duplicate note title found." });
  }
  const newNote = await Note.create({ user, title, description });

  if (newNote) {
    return res
      .status(201)
      .json({ message: "New Note created.", note: newNote });
  } else {
    return res.status(400).json({ message: "Invalid note data received." });
  }
};

const updateNote = async (req, res) => {
  const { id, user, title, description, completed } = req.body;

  if (
    !id ||
    !user ||
    !title ||
    !description ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicateTitle = await Note.findOne({ title }).lean().exec();

  if (duplicateTitle && duplicateTitle?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title found." });
  }

  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: `No note found.` });
  }

  note.user = user;
  note.title = title;
  note.description = description;
  note.completed = completed;

  const updatedNote = await note.save();

  res.status(200).json({ message: `Note with id:${note._id} is updated.` });
};

const deleteNote = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required." });
  }

  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Note not found." });
  }
  const deletedNote = await note.deleteOne();
  res.status(200).json({ message: `Note with id:${note._id} deleted.` });
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
