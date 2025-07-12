const mongoose = require("mongoose");
const RegCompany = require("../../models/companies/reg-company.model");

const getCompanyUsers = async (req, res) => {
  try {
    const companyId = req.params.id;

    // 1. Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID",
      });
    }

    // 2. Find company by ID and populate only 'users' field
    const company = await RegCompany.findById(companyId)
      .select("users") // bas users chahiye
      .populate("users", "-password"); // users ka data lao, password hide karo

    // const company = await RegCompany.findById(companyId)
    //   .select("users") // only users field from RegCompany
    //   .populate({
    //     path: "users",
    //     select: "-password", // exclude password
    //   });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // 3. Response
    res.status(200).json({
      success: true,
      count: company.users.length,
      users: company.users,
    });
  } catch (error) {
    console.error("Error fetching company users:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

module.exports = getCompanyUsers;
