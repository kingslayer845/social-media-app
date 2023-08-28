import { Router, Request, Response } from "express";
import { loginUser, protect, signupUser } from "../controllers/authController";
import { getUserProfile } from "../controllers/userController";
import { getUserPosts } from "../controllers/postController";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
router.get("/profile/posts", protect, getUserPosts);
router.get("/:userId/posts", protect, getUserPosts);
export default router;
