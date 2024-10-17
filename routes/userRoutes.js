// routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  GetAllUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/alluser", protect, GetAllUser);

export default router;
