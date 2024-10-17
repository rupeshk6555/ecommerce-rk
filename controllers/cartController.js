import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Get the logged-in user's ID

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create a new cart
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "title price"
    ); // Populate product details

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity of the existing item
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
};

// Get cart summary
export const getCartSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price"
    );

    if (!cart) return res.status(200).json({ totalItems: 0, totalCost: 0 });

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    res.status(200).json({ totalItems, totalCost, items: cart.items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart summary", error });
  }
};
