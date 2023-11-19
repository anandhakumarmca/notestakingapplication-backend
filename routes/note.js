import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.js";

const router = express.Router();

router.post("/createNote", protectRoute, createNote);
router.get("/getAllNotes", getAllNotes);
router.get("/getNote/:id", protectRoute, getNoteById);
router.put("/editNote/:id", protectRoute, updateNote);
router.delete("/deleteNote/:id", protectRoute, deleteNote);

export const notesRouter = router;
