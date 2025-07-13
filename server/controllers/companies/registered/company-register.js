// controllers/companyRequests/createCompanyRequest.js
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const CompanyRegister = require("../../../models/companies/reg-company.model");
const CompanyRequest = require("../../../models/companies/req-company.model");
const cloudinary = require("../../../config/cloudinary");

// Controller to handle company registration from request
const createCompanyRegister = async (req, res) => {
  try {
    const { id: companyReqId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyReqId)) {
      return res.status(400).json({ success: false, message: "Invalid Company ID" });
    }

    const existingRequest = await CompanyRequest.findById(companyReqId);
    if (!existingRequest) {
      return res.status(404).json({ success: false, message: "Company request not found" });
    }

    // Destructure request body
    const {
      companyName,
      companyEmail,
      companyPhone,
      industry,
      employeeRange,
      companyCity,
      companyCountry,
      companyAddress,
      subscriptionPlan,
    } = req.body;

    // Required fields validation
    const requiredFields = [
      "companyName",
      "companyEmail",
      "companyPhone",
      "industry",
      "employeeRange",
      "companyAddress",
      "companyCity",
      "companyCountry",
      "subscriptionPlan",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    // Upload logo if provided
    let logo = "";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "HRMS" });
        logo = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ success: false, message: "Failed to upload logo", error: uploadError.message });
      }
    }

    // Create new company registration
    const newCompanyRegister = new CompanyRegister({
      companyName,
      companyEmail,
      companyPhone,
      industry,
      employeeRange,
      companyLogo: logo,
      companyCity,
      companyCountry,
      companyAddress,
      subscriptionPlan,
    });

    await newCompanyRegister.save();

    // Delete request after successful registration
    await CompanyRequest.findByIdAndDelete(companyReqId);

    // Send admin registration link via email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ success: false, message: "Email credentials not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const registerLink = `http://localhost:5173/admin-register/${newCompanyRegister._id}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: companyEmail,
      subject: `Create admin account for ${companyName}`,
      html: `
        <p>Dear ${existingRequest.companyAdmin || "Admin"},</p>
        <p>We're pleased to inform you that your company has been successfully registered.</p>
        <p>You can now create an admin account to access your dashboard.</p>
        <p><a href="${registerLink}" target="_blank">Click here to register</a></p>
        <p>Best regards,<br/>HRPro Team</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered and email send to Admin successfully",
      data: newCompanyRegister,
      link: registerLink,
    });
  } catch (error) {
    console.error("Error in company registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createCompanyRegister;
