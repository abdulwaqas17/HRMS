const bcrypt = require("bcryptjs");
let mongoose = require("mongoose");
const User = require("../../models/roles/user.model");
const CompanyRegister = require("../../models/companies/reg-company.model");
const { isValidEmail, isValidPhone } = require("../../utils/validations");
const cloudinary = require("../../config/cloudinary");

// POST /api/admin/create
const createAdmin = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);

    let companyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Company ID" });
    }

    let isCompanyRegister = await CompanyRegister.findById(companyId);

    if (!isCompanyRegister) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      
    } = req.body;

    // ✅ 1. Field level validation
    if (!firstName || !email || !phone || !password || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // ✅ 2. Email format check
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // ✅ 3. Phone format check (international)
    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    // ✅ 5. Check if email already exists
    const isEmailExists = await CompanyRegister.findOne({ email });
    if (isEmailExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    // ✅ 6. Check if admin of this company already exists
    const isAdminExists = await CompanyRegister.findOne({role: "admin"});
    if (isAdminExists) {
      return res.status(409).json({
        success: false,
        message: "Admin of this company already exists",
      });
    }

    // ✅ 7. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("req.file =>", req.file);

    // ✅ 8 Upload logo if provided
    let img = "";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "HRMS",
        });
        img = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload logo",
          error: uploadError.message,
        });
      }
    }

    // ✅ 9. Create Admin User
    const admin = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      gender,
      dob,
      profileImage: img,
      company: isCompanyRegister._id,
    });

    await admin.save();

    //✅ also add hr in company
    isCompanyRegister.admin = admin._id;
    await isCompanyRegister.save();

    return res.status(201).json({
      success: true,
      message: "Admin created and added in company successfully",
      data: {
        id: admin._id,
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        company: admin.company,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error creating admin user:", error.message);

    // ✅ Show Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => {
        if (e.kind === "enum") {
          return e.properties.message || `Invalid value for ${e.path}`;
        }
        return e.message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createAdmin;
