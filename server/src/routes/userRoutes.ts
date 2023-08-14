import { Router, Request, Response } from "express";
import { loginUser, protect, signupUser } from "../controllers/authController";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
export default router;
