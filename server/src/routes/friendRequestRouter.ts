import { Router } from "express";
import {
  acceptRequest,
  declineRequest,
  getFriendsAndRequests,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friendRequestController";
import { protect } from "../controllers/authController";

const router = Router();

router.use(protect);
router.delete("/:friendId", removeFriend);
router.post("/send-request", sendFriendRequest);
router.post("/accept-request", acceptRequest);
router.post("/decline-request", declineRequest);
router.get("/user-requests");
router.get("/friends-requests",getFriendsAndRequests)
export default router;
