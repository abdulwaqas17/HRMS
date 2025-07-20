const RegisterCompany = require('../../../models/companies/reg-company.model');
const { generatePlainSlug, generateDashSlug } = require('../../../utils/slugs');

const checkCompanyExits = async (req, res) => {
  const { companyName } = req.params;

  try {
      
      const case1 = generateDashSlug(companyName);
          const case2 = generatePlainSlug(companyName);
  
    // Find company request
    const isCompany = await RegisterCompany.find({ $or: [{ companyName: case1 }, { companyName: case2 }] });

    console.log(`Checking company : ${isCompany}`);
    

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
      link: `/${case1}`,
      data : isCompany,
      message: "Company exists",
    });

  } catch (error) {
    console.error("Error fetching company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = checkCompanyExits;

