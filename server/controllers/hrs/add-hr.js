// controllers/hr/addHR.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/roles/user.model"); // HR model
const RegCompany = require("../../models/companies/reg-company.model");
const { isValidEmail, isValidPhone } = require("../../utils/validations");

const addHR = async (req, res) => {
  let companyId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Company ID" });
  }

     // ✅ Check if company exists
    const companyExists = await RegCompany.findById(companyId);
    if (!companyExists) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      department,
      salary,
      company,
      profileImage,
    } = req.body;

    // ✅ Check required fields
    if (
      !firstName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !department ||
      !salary ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // ✅ Validate email and phone
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    // ✅ Check if email already exists
    const alreadyExists = await RegCompany.findOne({ email });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }


    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create HR user
    const newHR = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      gender,
      dob,
      department,
      salary,
      company,
      role: "hr",
      profileImage,
    });

    await newHR.save();
    
    //also add hr in company
    companyExists.users.push(newHR._id);
    await companyExists.save();


    return res.status(201).json({
      success: true,
      message: "HR created and added in company successfully",
      data: {
        _id: newHR._id,
        firstName: newHR.firstName,
        email: newHR.email,
        role: newHR.role,
      },
    });
  } catch (error) {
    console.error("Error creating HR:", error);

    // 🧠 Handle validation errors clearly
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = addHR;
