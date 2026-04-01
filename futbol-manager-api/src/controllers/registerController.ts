import type { Request, Response } from "express";
import { createUser as addUser, getUserByEmail } from "../services/userService.js";
import { createOtp, verifyOtp } from "../services/otpService.js";
import { isValidMexicanPhone } from "../services/notificationService.js";
import { sendOtpBySms } from "../services/notificationService.js";

// Paso 1: Solicitar OTP por SMS
export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    // Validaciones
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    if (!isValidMexicanPhone(phoneNumber)) {
      return res.status(400).json({
        error: "Invalid Mexican phone number format. Use: +52 55 xxxx xxxx or +52 56 xxxx xxxx",
      });
    }

    // Generar OTP
    const otpCode = await createOtp(undefined, phoneNumber);

    // Enviar OTP por SMS
    try {
      await sendOtpBySms(phoneNumber, otpCode);
    } catch (notificationError: any) {
      console.error("SMS notification error:", notificationError);
      // En desarrollo, retornamos el código. En producción, solo registramos el error
      if (process.env.NODE_ENV !== "production") {
        return res.status(200).json({
          message: "OTP generated (SMS not configured)",
          otpCode: otpCode,
        });
      }
      throw notificationError;
    }

    res.status(200).json({
      message: "OTP sent successfully via SMS",
      // Solo en desarrollo, retornamos el código
      otpCode: process.env.NODE_ENV === "development" ? otpCode : undefined,
    });
  } catch (error: any) {
    console.error("Request OTP error:", error);
    res.status(500).json({ error: error.message || "Error requesting OTP" });
  }
};

// Paso 2: Verificar OTP y crear usuario
export const registerWithOtp = async (req: Request, res: Response) => {
  try {
    const {
      phoneNumber,
      otpCode,
      email,
      firstName,
      lastName,
      middleName,
      password,
      birthDate,
      gender,
    } = req.body;

    // Validaciones
    if (!otpCode) {
      return res.status(400).json({ error: "OTP code is required" });
    }

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    if (!firstName || !lastName || !password || !birthDate || !gender || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verificar si el email ya está registrado
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Verificar OTP
    try {
      await verifyOtp(otpCode, undefined, phoneNumber);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
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
      roleId: 5, // Player role ID (ver script.sql)
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