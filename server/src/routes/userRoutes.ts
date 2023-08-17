import { Router, Request, Response } from "express";
import { loginUser, protect, signupUser } from "../controllers/authController";
import { createPost, getUserPosts } from "../controllers/postController";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
export default router;
