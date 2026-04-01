import type { Request, Response } from "express";
import {
  getUserByEmail as fetchUserByEmail,
  getUserById as fetchUserById,
} from "../services/userService.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  tokenBlacklist,
  decodeToken,
} from "../middlewares/authMiddleware.js";
import bcrypt from "bcrypt";

// Store refresh tokens
const refreshTokens: Set<string> = new Set();

// Store active sessions (userId -> user info with token info)
const activeSessions: Map<number, any> = new Map();

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await fetchUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userPassword = user.password || user.dataValues?.password;

    if (!userPassword) {
      return res.status(500).json({ error: "Password not found in database" });
    }

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.add(refreshToken);

    // Decode tokens to get expiration time
    const accessTokenDecoded = decodeToken(accessToken);
    const refreshTokenDecoded = decodeToken(refreshToken);

    // Add user to active sessions with token expiration info
    const userData = {
      id: user.id || user.dataValues?.id,
      email: user.email || user.dataValues?.email,
      firstName: user.firstName || user.dataValues?.firstName,
      lastName: user.lastName || user.dataValues?.lastName,
      middleName: user.middleName || user.dataValues?.middleName,
      phoneNumber: user.phoneNumber || user.dataValues?.phoneNumber,
      gender: user.gender || user.dataValues?.gender,
      loginTime: new Date(),
      accessTokenExpiresAt: new Date(accessTokenDecoded?.exp * 1000),
      refreshTokenExpiresAt: new Date(refreshTokenDecoded?.exp * 1000),
    };

    activeSessions.set(user.id || user.dataValues?.id, userData);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      accessTokenExpiresAt: userData.accessTokenExpiresAt,
      refreshTokenExpiresAt: userData.refreshTokenExpiresAt,
      user: {
        id: user.id || user.dataValues?.id,
        email: user.email || user.dataValues?.email,
        firstName: user.firstName || user.dataValues?.firstName,
        lastName: user.lastName || user.dataValues?.lastName,
        middleName: user.middleName || user.dataValues?.middleName,
        phoneNumber: user.phoneNumber || user.dataValues?.phoneNumber,
        gender: user.gender || user.dataValues?.gender,
        birthDate: user.birthDate || user.dataValues?.birthDate,
        roleId: user.roleId || user.dataValues?.roleId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Refresh token
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    if (!refreshTokens.has(refreshToken)) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const decoded = verifyRefreshToken(refreshToken) as any;

    if (!decoded) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }

    const user = await fetchUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newAccessToken = generateAccessToken(user);
    const newAccessTokenDecoded = decodeToken(newAccessToken);

    res.json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      accessTokenExpiresAt: new Date(newAccessTokenDecoded?.exp * 1000),
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken, userId, accessToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    // Remove refresh token
    if (refreshTokens.has(refreshToken)) {
      refreshTokens.delete(refreshToken);
    }

    // Add access token to blacklist
    if (accessToken) {
      tokenBlacklist.add(accessToken);
    }

    // Remove user from active sessions
    if (userId) {
      activeSessions.delete(userId);
    }

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get active sessions with expiration info
export const getActiveSessions = async (req: Request, res: Response) => {
  try {
    const activeSessions_array = Array.from(activeSessions.values()).map(
      (session) => {
        const now = new Date();
        const accessTokenExpiresIn = Math.floor(
          (session.accessTokenExpiresAt.getTime() - now.getTime()) / 1000,
        );
        const refreshTokenExpiresIn = Math.floor(
          (session.refreshTokenExpiresAt.getTime() - now.getTime()) / 1000,
        );
        const totalSessionTime = Math.floor(
          (session.refreshTokenExpiresAt.getTime() -
            session.loginTime.getTime()) /
            1000,
        );
        const elapsedTime = Math.floor(
          (now.getTime() - session.loginTime.getTime()) / 1000,
        );

        return {
          id: session.id,
          email: session.email,
          firstName: session.firstName,
          lastName: session.lastName,
          phoneNumber: session.phoneNumber,
          gender: session.gender,
          loginTime: session.loginTime,
          accessTokenExpiresAt: session.accessTokenExpiresAt,
          refreshTokenExpiresAt: session.refreshTokenExpiresAt,
          sessionStatus: {
            accessTokenExpiresIn: `${accessTokenExpiresIn}s (${Math.floor(accessTokenExpiresIn / 60)}m)`,
            refreshTokenExpiresIn: `${refreshTokenExpiresIn}s (${Math.floor(refreshTokenExpiresIn / 3600)}h ${Math.floor((refreshTokenExpiresIn % 3600) / 60)}m)`,
            sessionDuration: `${Math.floor(totalSessionTime / 3600)}h ${Math.floor((totalSessionTime % 3600) / 60)}m`,
            elapsedTime: `${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s`,
            isAccessTokenValid: accessTokenExpiresIn > 0,
            isRefreshTokenValid: refreshTokenExpiresIn > 0,
          },
        };
      },
    );

    res.json({
      message: "Active sessions",
      totalActive: activeSessions_array.length,
      timestamp: new Date(),
      sessions: activeSessions_array,
    });
  } catch (error) {
    console.error("Get active sessions error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
