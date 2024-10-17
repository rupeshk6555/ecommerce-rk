import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  getCartSummary,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart); // Add item to cart
router.get("/", protect, getCart); // Get user's cart
router.put("/", protect, updateCartItem); // Update item quantity
router.delete("/", protect, removeCartItem); // Remove item from cart
router.get("/summary", protect, getCartSummary); // Get cart summary

export default router;
