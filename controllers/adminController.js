// controllers/adminController.js
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Get all users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
// Edit user details
export const editUser = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user account
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Edit a product
export const editProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

// Get sales report
export const getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((total, order) => total + order.total, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales report", error });
  }
};

// Get user activity report
export const getUserActivityReport = async (req, res) => {
  try {
    const users = await User.find().populate("orders"); // Assuming you have a reference to orders in User model
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user activity report", error });
  }
};
