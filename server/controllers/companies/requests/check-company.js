const RegisterCompany = require("../../../models/companies/reg-company.model");
const OwnerCompany = require("../../../models/service-provider/service-provider.model");
const { generatePlainSlug, generateDashSlug } = require("../../../utils/slugs");

const checkCompanyExits = async (req, res, next) => {
  const { companyName, role } = req.params;
  const allowedRoles = ["owner", "admin", "hr", "employee"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
  try {
    const case1 = generateDashSlug(companyName);
    const case2 = generatePlainSlug(companyName); 


    let isCompany = null;
    if (role.toLowerCase() === "owner") {
       isCompany = await OwnerCompany.findOne({
        $or: [{ companyNameSlug: case1 }, { companyNameSlug: case2 }],
      });
    } else {
      // Find company request
       isCompany = await RegisterCompany.findOne({
        $or: [{ companyNameSlug: case1 }, { companyNameSlug: case2 }],
      });
    }

    console.log(`Checking company : ${isCompany}`);

    if (!isCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
        link: "/not-found",
      });
    }

    req.company = isCompany; // Assuming you want the first match

    return next();
  } catch (error) {
    console.error("Error fetching company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = checkCompanyExits;
