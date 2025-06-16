// controllers/user/createOwner.js
let User = require("../../models/roles/user.model.js");
let bcrypt = require("bcryptjs");

const createOwner = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      profileImage,
    } = req.body;

    // Check if email already exists
    const isOwner = await User.findOne({ role: "owner" });
    if (isOwner) {
      return res
        .status(400)
        .json({ success: false, message: "Only one owner allow" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create owner user
    const ownerUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "owner",
      gender,
      dob,
      profileImage,
    });

    await ownerUser.save();

    res.status(201).json({
      success: true,
      message: "Owner created successfully",
      data: ownerUser,
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createOwner;
