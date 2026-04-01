import type { Request, Response } from "express";
import { createUser as addUser, getUserByEmail } from "../services/userService.js";

// Registrar usuario directamente
export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      middleName,
      password,
      birthDate,
      gender,
      phoneNumber,
    } = req.body;

    // Validaciones
    if (!firstName || !lastName || !password || !birthDate || !gender || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Verificar si el email ya está registrado
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Crear usuario con rol por defecto "Player"
    const user = await addUser({
      firstName,
      lastName,
      middleName,
      email,
      password,
      birthDate,
      gender,
      phoneNumber,
      roleId: 5, // Player role ID
      createdBy: "REGISTRATION",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: `The email ${error.errors[0].value} is already registered`,
      });
    }

    res.status(500).json({ error: error.message || "Error registering user" });
  }
};