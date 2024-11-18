import express from "express";
import { login, register, logout, getUser, verifyUser, generateVerificationCode } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verifyUser);
router.post("/generate-code", generateVerificationCode);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;