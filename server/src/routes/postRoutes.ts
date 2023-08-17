import { Router } from "express";
import { protect } from "../controllers/authController";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postController";
import { toggleLike } from "../controllers/likeController";

const router = Router();

router.use(protect);
router.route("/").get(getAllPosts).post(createPost);
router.route("/user-posts").get(getUserPosts);
router.delete("/:postId", deletePost);

router.post("/:postId/toggle-like", toggleLike);

export default router;
