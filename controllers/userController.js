// controllers/userController.js
import User from "../models/User.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { username, name, phoneNumber, address } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GetAllUser
export const GetAllUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
