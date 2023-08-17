import { Router } from "express";
import {
  acceptRequest,
  declineRequest,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friendRequestController";
import { protect } from "../controllers/authController";

const router = Router();

router.use(protect);
router.delete("/", removeFriend);
router.post("/send-request", sendFriendRequest);
router.post("/accept-request", acceptRequest);
router.post("/decline-request", declineRequest);
router.get("/user-requests");
export default router;
