import bctypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bctypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Registering User", success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    const isPasswordValid = await bctypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "you are not authorized to log in as this role",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).cookie("token", token).json({
      message: "User logged in successfully",
      user,
      token,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Logging In User", success: false });
  }
};
export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "")
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Logging Out User", success: false });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, skills, phoneNumber, fullName, email } = req.body;
    const files = req.files; // Assuming you're using multer for file uploads
    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // user.profile.resume = files; // Store the uploaded files in the user document
    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error in Updating Profile", success: false });
  }
};
