import express from "express";
import { register, login, getMe, logoutUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", protect, getMe);
router.post("/logout", protect, logoutUser);

export default router;
