// models/Category.js
import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to parent category
    attributes: [attributeSchema], // Attributes specific to this category
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
