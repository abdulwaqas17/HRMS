// controllers/hr/addEmployee.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/roles/user.model"); // HR model
const Company = require("../../models/companies/company.model");
const { isValidEmail, isValidPhone } = require("../../utils/validations");

const addEmployee = async (req, res) => {
  let companyId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Company ID" });
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
      designation,
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
      !designation ||
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
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // ✅ Check if company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create HR user
    const newEmployee = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      gender,
      dob,
      designation,
      salary,
      company,
      role: "employee",
      profileImage,
    });

    await newEmployee.save();
    
    //also add hr in company
    companyExists.employees.push(newEmployee._id);
    await companyExists.save();


    return res.status(201).json({
      success: true,
      message: "Employee created and added in company successfully",
      data: {
        _id: newEmployee._id,
        firstName: newEmployee.firstName,
        email: newEmployee.email,
        role: newEmployee.role,
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

module.exports = addEmployee;
