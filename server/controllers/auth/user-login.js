// // controllers/auth/login.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// // const User = require("../../models/roles/user.model");

// const UserLogin = async (req, res) => {
//   try {
//     const { role } = req.params; // dynamic role from URL

//     const Company = req.company; // company from middleware

//     // check role
//     const allowedRoles = ["owner", "admin", "hr", "employee"];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     // get email password
//     const { email, password } = req.body;

//     // check if email password present
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     // Find user
//     const user = await Company.findOne({ email: email.toLowerCase(), role });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     // Generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "2h" }
//     );

//     const { password: _, ...userData } = user.toObject();

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: userData,
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = UserLogin;

const UserLogin = async (req, res) => {
  try {
    const { role } = req.params; // dynamic role from URL
    const company = req.company; // company document from middleware
  

    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    let user = null;
    if (role === "owner") {
      // Populate and check owner
      await company.populate("owner");
      if (
        company.owner &&
        company.owner.email.toLowerCase() === email.toLowerCase() &&
        company.owner.role === "owner"
      ) {
        user = company.owner;
      }
    } else if (role === "admin") {
      // Populate and check admin
      await company.populate("admin");
      if (
        company.admin &&
        company.admin.email.toLowerCase() === email.toLowerCase() &&
        company.admin.role === "admin"
      ) {
        user = company.admin;
      }
    } else {
      // Populate users array and find matching user
      await company.populate("users");
      user = company.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
      link : `/${company.companyNameSlug}/${role.toLowerCase()}/dashboard`,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = UserLogin;