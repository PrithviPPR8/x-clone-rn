import express from "express";
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/profile/:username", asyncHandler(getUserProfile));

// protected routes (wrapped)
router.post("/sync", protectRoute, asyncHandler(syncUser));
router.post("/me", protectRoute, asyncHandler(getCurrentUser));
router.put("/profile", protectRoute, asyncHandler(updateProfile));
router.post("/follow/:targetUserId", protectRoute, asyncHandler(followUser));

export default router;
