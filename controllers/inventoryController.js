// controllers/inventoryController.js
import Inventory from "../models/Inventory.js";

// Update stock level after order or return
export const updateStockLevel = async (productId, quantity) => {
  try {
    const inventory = await Inventory.findOne({ productId });
    if (inventory) {
      inventory.stockLevel -= quantity; // Decrease stock for order
      await inventory.save();
    } else {
      console.warn(`No inventory record for product ID: ${productId}`);
    }
  } catch (error) {
    console.error("Error updating stock level", error);
  }
};

// Get low stock products
export const getLowStockProducts = async (req, res) => {
  const lowStockThreshold = 10; // Define low stock threshold

  try {
    const lowStockProducts = await Inventory.find({
      stockLevel: { $lt: lowStockThreshold },
    }).populate("productId");
    res.json(lowStockProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching low stock products", error });
  }
};
