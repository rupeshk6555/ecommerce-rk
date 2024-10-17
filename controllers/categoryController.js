// controllers/categoryController.js
import Category from "../models/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, parent, attributes } = req.body;

  try {
    // already exists
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category with the parent's ObjectId
    const newCategory = new Category({
      name,
      parent,
      attributes,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all categories

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent", "name");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get a single category
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("parent", "name");
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parent, attributes } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, parent, attributes },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
