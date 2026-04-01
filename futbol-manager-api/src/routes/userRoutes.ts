import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes (sin autenticación)
router.post("/", authMiddleware, createUser);

// Protected routes (con autenticación)
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;