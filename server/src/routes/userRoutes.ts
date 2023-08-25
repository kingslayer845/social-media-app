import { Router, Request, Response } from "express";
import { loginUser, protect, signupUser } from "../controllers/authController";
import { getUserProfile } from "../controllers/userController";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
export default router;
