import express from "express";
import { authRouter } from "./auth.js";
import { notesRouter } from "./note.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/note", notesRouter);

export const indexRoutes = router;
