// routes/adminRoutes.js
import express from "express";
import {
  getUsers,
  editUser,
  deleteUser,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminMiddleware); // Protect all routes with auth and admin check

// User management routes
router.get("/users", getUsers); // Get all users
router.put("/users/:userId", editUser); // Edit user
router.delete("/users/:userId", deleteUser); // Delete user

// Product management routes
router.get("/products", getProducts); // Get all products
router.post("/products", addProduct); // Add a product
router.put("/products/:productId", editProduct); // Edit a product
router.delete("/products/:productId", deleteProduct); // Delete a product

// Order management routes
router.get("/orders", getOrders); // Get all orders
router.put("/orders/:orderId", updateOrderStatus); // Update order status

export default router;
