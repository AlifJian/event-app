import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

// Auth Route
router.post("/auth/register", authController.register);

export default router;
