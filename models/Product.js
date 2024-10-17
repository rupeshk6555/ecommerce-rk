// models/Product.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  additionalPrice: { type: Number, default: 0 },
});

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [{ type: String }], // Store image URLs
    stockQuantity: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    variants: [variantSchema], // Product variants (size, color, etc.)
    reviews: [reviewSchema], // Product reviews
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
