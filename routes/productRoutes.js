// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", protect, createProduct);  
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/:id/review", protect, addReview); // Add review

export default router;
