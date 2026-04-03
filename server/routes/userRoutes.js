import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import { getMe } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// protext route - only logged-in users can access their own data
router.get("/me", authMiddleware, getMe);

export default router;
