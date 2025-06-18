// controllers/auth/login.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/roles/user.model");

const UserLogin = async (req, res) => {
  try {
    const { role } = req.params; // dynamic role from URL

    // check role
    const allowedRoles = ["owner", "admin", "hr", "employee"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    
    // get email password
    const { email, password } = req.body;

    // check if email password present
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Find user
    const user = await User.findOne({ email: email.toLowerCase(), role });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = UserLogin;
