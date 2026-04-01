import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key_here_change_in_production";
const REFRESH_SECRET = "your_refresh_secret_key_change_in_production";

export interface AuthRequest extends Request {
  user?: any;
  newAccessToken?: string;
}

// Blacklist for invalidated tokens
export const tokenBlacklist: Set<string> = new Set();

// Access token middleware with auto-renewal
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // Check if token is blacklisted
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: "Token has been revoked. Please login again" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;

    // Generate new token with renewed expiration (auto-renewal)
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store new token to send in response
    req.newAccessToken = newAccessToken;

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Generate access token
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role?.name || "User",
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Generate refresh token
export const generateRefreshToken = (user: any) => {
  const userId = user.id || user.dataValues?.id;
  const userEmail = user.email || user.dataValues?.email;

  return jwt.sign(
    {
      id: userId,
      email: userEmail,
    },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Decode token without verification (to get exp)
export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token) as any;
  } catch (error) {
    return null;
  }
};