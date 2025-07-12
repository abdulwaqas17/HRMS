const mongoose = require('mongoose');
const CompanyRequest = require('../../../models/companies/req-company.model');

const getCompanyRequest = async (req, res) => {
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
    const companyRequest = await CompanyRequest.findById(companyId);

    if (!companyRequest) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
        link: "/not-found"
      });
    }

    // Return company request
    return res.status(200).json({
      success: true,
      data: companyRequest,
      message: "Company request fetched successfully"
    });

  } catch (error) {
    console.error("Error fetching company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = getCompanyRequest;
