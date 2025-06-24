const mongoose = require('mongoose');
const RegisterCompany = require('../../../models/companies/company.model');

const getRegisteredCompany = async (req, res) => {
  const { id: companyId } = req.params;

  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID",
        link: "/not-found"
      });
    }

    // Find company request
    const isCompany = await RegisterCompany.findById(companyId);

    if (!isCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
        link: "/not-found"
      });
    }

    // Return register company
    return res.status(200).json({
      success: true,
      data: isCompany,
      message: "Register company fetched successfully"
    });

  } catch (error) {
    console.error("Error fetching company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = getRegisteredCompany;
