// controllers/companyRequests/createCompanyRequest.js
const mongoose = require("mongoose");
const CompanyRegister = require("../../../models/companies/company.model");
const CompanyRequest = require("../../../models/companies/request.model");
const cloudinary = require("../../../config/cloudinary");

// Controller to handle company request creation
const createCompanyRegister = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);

    let companyReqId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(companyReqId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Company ID" });
    }

    let isCompanyReq = await CompanyRequest.findById(companyReqId);

    if (!isCompanyReq) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    console.log(req.body);
    console.log(req.file);

    // Step 1: Extract data from request body
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

    // Step 2: Optional - Backend validation before mongoose (double-check frontend)
    // if (
    //   !companyName ||
    //   !companyEmail ||
    //   !companyPhone ||
    //   !industry ||
    //   !employeeRange ||
    //   !companyLogo ||
    //   !companyAddress ||
    //   !companyCity ||
    //   !companyCountry ||
    //   !subscriptionPlan
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please fill all required fields",
    //   });
    // }
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
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "HRMS",
        });
        var logo = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload logo",
          error: uploadError.message,
        });
      }
    }

    // Step 3: Create new request document
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

    // Step 4: Save to DB
    await newCompanyRegister.save();

    // Step 5: Send response
    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      data: newCompanyRegister,
    });
  } catch (error) {
    console.error("Error creating company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createCompanyRegister;
