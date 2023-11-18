import express from "express";
import {
  activateUser,
  forgotPassword,
  login,
  register,
  resetpassword,
  verifyRandomString,
} from "../controllers/auth.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/activate/:activationToken", activateUser);
router.post("/login", login);
router.get("/protected-route", protectRoute, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});
router.post("/forgotpassword", forgotPassword);
router.get("/verifyRandomString/:randomString", verifyRandomString);
router.put("/resetpassword/:randomString", resetpassword);

export const authRouter = router;
