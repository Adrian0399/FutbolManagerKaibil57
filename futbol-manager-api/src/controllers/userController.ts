import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import {
  getAllUsers as fetchAllUsers,
  getUserById as fetchUserById,
  createUser as addUser,
  updateUser as modifyUser,
  deleteUser as removeUser,
} from "../services/userService.js";

// Get all users
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.json({
      users: users,
      newAccessToken: req.newAccessToken,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Get user by ID
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await fetchUserById(Number(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: user,
      newAccessToken: req.newAccessToken,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Create user
export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      email,
      password,
      birthDate,
      gender,
      phoneNumber,
      roleId,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !birthDate || !gender || !roleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await addUser({
      firstName,
      lastName,
      middleName,
      email,
      password,
      birthDate,
      gender,
      phoneNumber,
      roleId,
      createdBy: "SYSTEM",
    });

    res.status(201).json({
      message: "User created successfully",
      user: user,
      newAccessToken: req.newAccessToken,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: `The email ${error.errors[0].value} is already registered`,
      });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ error: "Invalid role ID" });
    }

    res.status(500).json({ error: error.message || "Error creating user" });
  }
};

// Update user
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const updatedUser = await modifyUser(Number(id), {
      ...req.body,
      updatedBy: "SYSTEM",
    });

    res.json({
      message: "User updated successfully",
      user: updatedUser,
      newAccessToken: req.newAccessToken,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message || "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await removeUser(Number(id));

    res.json({
      message: "User deleted successfully",
      newAccessToken: req.newAccessToken,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message || "Error deleting user" });
  }
};