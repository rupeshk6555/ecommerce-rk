// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrderHistory,
  trackOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder); // Create order
router.get("/history", protect, getOrderHistory); // Get order history
router.get("/:id", protect, trackOrder); // Track order
router.delete("/:id", protect, cancelOrder); // Cancel order

export default router;
