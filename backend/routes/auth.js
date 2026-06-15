const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { validateSignup, validateLogin } = require("../utils/validators");
const { handleError } = require("../utils/errorHandler");

const router = express.Router();

// Helper: generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Helper: format user response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
  };
};

// POST /api/auth/register - Sign up new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("[Register] Received:", {
      firstName,
      lastName,
      email,
      passwordLength: password?.length,
    });

    // Validate input
    const validation = validateSignup({ firstName, lastName, email, password });
    if (!validation.isValid) {
      console.log("[Register] Validation failed:", validation.errors);
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("[Register] User already exists:", email);
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    console.log("[Register] Creating user...");
    // Create user
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    console.log("[Register] User created successfully:", user._id);
    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Account created successfully. Welcome to ResumeLens!",
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    console.error("[Register] Error caught:", err);
    handleError(err, res);
  }
});

// POST /api/auth/login - Sign in user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful. Welcome back!",
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    handleError(err, res);
  }
});

// GET /api/auth/profile - Get current user profile (protected)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Profile retrieved successfully.",
      user: formatUserResponse(user),
    });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/verify-token - Verify if token is valid
router.post("/verify-token", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Token is valid.",
      isValid: true,
      user: formatUserResponse(user),
    });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/auth/logout - Logout user (client-side token removal)
router.post("/logout", auth, (req, res) => {
  try {
    res.json({
      message:
        "Logout successful. Please delete your token on the client side.",
      isLoggedOut: true,
    });
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
