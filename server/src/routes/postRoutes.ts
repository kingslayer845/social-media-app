import { Router } from "express";
import { protect } from "../controllers/authController";
import {
  createUserPost,
  deletePost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postController";
import { toggleLike } from "../controllers/likeController";
import multer from "multer";
import path from "path";

const router = Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/post-image"); // Set the destination folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extension); // Set the filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

router.use(protect);
router.route("/").get(getAllPosts).post(upload.single("image"), createUserPost);
router.route("/user-posts").get(getUserPosts);
router.delete("/:postId", deletePost);

router.post("/:postId/toggle-like", toggleLike);

export default router;
