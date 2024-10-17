// controllers/productController.js
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Create a new product
// export const createProduct = async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     category,
//     stockQuantity,
//     sku,
//     images,
//     variants,
//   } = req.body;

//   try {
//     // Find the category by name to get its ObjectId
//     const categoryData = await Category.findOne({ category });
//     if (!categoryData) {
//       return res.status(400).json({ message: "Category not found" });
//     }
//     // already exists
//     const product = await Product.findOne({ title });
//     if (product) {
//       return res.status(400).json({ message: "Product already exists" });
//     }

//     // Create a new product with the category's ObjectId
//     const newProduct = new Product({
//       title,
//       description,
//       price,
//       category: categoryData._id,
//       images,
//       stockQuantity,
//       sku,
//       variants,
//     });

//     await newProduct.save();

//     res.status(201).json({
//       product: newProduct,
//       message: "Product created successfully",
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
export const createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    stockQuantity,
    sku,
    images,
    variants,
  } = req.body;

  try {
    // Find the category by its ObjectId
    const categoryData = await Category.findOne({ name: category });

    if (!categoryData) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Check if the product already exists
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create a new product with the category's ObjectId
    const newProduct = new Product({
      title,
      description,
      price,
      category: categoryData._id,
      images,
      stockQuantity,
      sku,
      variants,
    });

    await newProduct.save();

    res.status(201).json({
      product: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, stockQuantity, sku, variants } =
    req.body;

  try {
    const update = {
      $set: {
        title,
        description,
        price,
        category,
        stockQuantity,
        variants,
        ...(images && { images }), // Include images only if they exist
      },
    };

    // If the SKU has changed, check if it already exists
    if (sku) {
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct && existingProduct._id.toString() !== id) {
        return res.status(400).json({ message: "SKU already exists" });
      }
      update.$set.sku = sku;
    }

    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating product", error });
  }
};
// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Add a review
export const addReview = async (req, res) => {
  const { id } = req.params; // Product ID
  const { rating, comment } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push({ userId, rating, comment });
    await product.save();

    res.json({ message: "Review added successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error adding review", error });
  }
};
