import { Router } from "express";
import { requestOtp, registerWithOtp } from "../controllers/registerController.js";

const router = Router();

// Public routes (sin autenticación)
router.post("/request-otp", requestOtp);
router.post("/register", registerWithOtp);

export default router;