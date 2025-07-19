const mongoose = require("mongoose");
const User = require("../../models/roles/user.model");
const RegCompany = require("../../models/companies/reg-company.model");
const { isValidEmail, isValidPhone } = require("../../utils/validations");
const cloudinary = require("../../config/cloudinary");

const addUser = async (req, res) => {
  const { role, companyID } = req.params;

  // ✅ Validate role & companyID
  if (!["hr", "employee"].includes(role.toLowerCase())) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }

  if (!mongoose.Types.ObjectId.isValid(companyID)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Company ID",
    });
  }

  // ✅ Check if company exists
  const companyExists = await RegCompany.findById(companyID);
  if (!companyExists) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      designation,
      department,
    } = req.body;

    // ✅ Basic Required Fields
    if (!firstName || !lastName || !email || !phone || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // ✅ Role Based Validation
    if (role === "employee" && !designation) {
      return res.status(400).json({
        success: false,
        message: "Designation is required for employee",
      });
    }

    if (role === "hr" && !department) {
      return res
        .status(400)
        .json({ success: false, message: "Department is required for HR" });
    }

    // ✅ Image upload from req.file
    const profileImage = req.file;

    console.log("req.file", req.file);

    let img = "";
    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    } else {
      // ✅ Upload logo if provided

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "HRMS/users",
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

    // ✅ Validate Email and Phone
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // ✅ Check Email Uniqueness
    const alreadyExists = await RegCompany.findOne({ email });
    const adminEmail = await RegCompany.findOne({ admin }).populate(
      "admin",
      "email"
    );
    if (alreadyExists || (adminEmail && adminEmail.admin?.email === email)) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ✅ Create New User
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      gender,
      dob,

      profileImage: img,
      company: companyID,
      role: role.toLowerCase(),
      designation: role === "employee" ? designation : undefined,
      department: role === "hr" ? department : undefined,
    });

    await newUser.save();

    // ✅ Push into Company
    companyExists.requests.push(newUser._id);
    await companyExists.save();

    return res.status(201).json({
      success: true,
      message: "Your registration request has been sent successfully",
      data: {
        _id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = addUser;
