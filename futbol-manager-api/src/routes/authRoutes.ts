import { Router } from "express";
import {
  login,
  refreshAccessToken,
  logout,
  getActiveSessions,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

// Protected routes
router.get("/sessions", authMiddleware, getActiveSessions);

export default router;