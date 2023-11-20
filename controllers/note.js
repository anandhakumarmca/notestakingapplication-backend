import Note from "../models/note.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      user: req.user._id,
    });
    const savedNote = await newNote.save();
    res.json({ success: true, note: savedNote });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await Note.find({ user: userId });
    console.log("Test", notes);

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        message: "No notes found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All notes retrieved successfully",
      data: notes,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get a specific note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  try {
    const NoteId = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(NoteId, {
      title,
      content,
    });

    if (!updatedNote) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
