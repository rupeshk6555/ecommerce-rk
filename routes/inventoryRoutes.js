// routes/inventoryRoutes.js
import express from "express";
import { getLowStockProducts } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/low-stock", getLowStockProducts); // Get low stock products

export default router;
