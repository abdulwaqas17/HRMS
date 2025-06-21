const CompanyRegister = require("../../../models/companies/company.model");

let getRegisteredCompanies = async (req, res) => {
  try {
    let registeredCompanies = await CompanyRegister.find()
      .populate("admin") 
      .sort({ createdAt: -1 });
    if (!registeredCompanies || registeredCompanies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No registered companies found",
      });
    }
    return res.status(200).json({
      success: true,
      data: registeredCompanies,
      message: "Getting registered companies successfully",
    });
  } catch (error) {
    console.error("Error fetching registered companies:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = getRegisteredCompanies;
