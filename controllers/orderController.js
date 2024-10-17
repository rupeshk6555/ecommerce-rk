// controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Inventory from "../models/Inventory.js";
import User from "../models/User.js";
import razorpay from "../config/razorpay.js";
import nodemailer from "nodemailer";

// Create a new order
export const createOrder = async (req, res) => {
  const { billingAddress, shippingAddress } = req.body;
  const userId = req.user.id; // Get the logged-in user's ID

  try {
    // Get the user's cart items
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    // Create Razorpay order
    const options = {
      amount: total * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt_${Math.random() * 10000}`,
    };
    const order = await razorpay.orders.create(options);

    // Create the order
    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      billingAddress,
      shippingAddress,
      paymentStatus: "pending",
      total,
      razorpayOrderId: order.id,
    });

    await newOrder.save();

    // Update inventory
    await Promise.all(
      cart.items.map(async (item) => {
        const inventory = await Inventory.findOne({
          productId: item.productId,
        });
        inventory.stockLevel -= item.quantity;
        await inventory.save();
      })
    );

    // Clear the cart after successful order
    await Cart.findOneAndDelete({ userId });

    // Send confirmation email
    sendConfirmationEmail(userId, newOrder);

    res.status(201).json({ orderId: newOrder._id, order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Send confirmation email
const sendConfirmationEmail = async (userId, order) => {
  const user = await User.findById(userId);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Order Confirmation",
    text: `Thank you for your order!\n\nOrder ID: ${order._id}\nTotal: ₹${order.total}\nStatus: ${order.orderStatus}\n`,
  };

  await transporter.sendMail(mailOptions);
};

// Get order history
export const getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};

// Track order status
export const trackOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order status", error });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = "Cancelled";
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};
