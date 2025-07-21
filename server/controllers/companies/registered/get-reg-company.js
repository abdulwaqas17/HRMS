const RegisterCompany = require("../../../models/companies/reg-company.model");
const OwnerCompany = require("../../../models/service-provider/service-provider.model");
const { generatePlainSlug, generateDashSlug } = require("../../../utils/slugs");

const getRegisteredCompany = async (req, res) => {
  const { companyName} = req.params;

  try {
    const case1 = generateDashSlug(companyName);// tech-starts 
    const case2 = generatePlainSlug(companyName);// techstarts
    // console.log("Checking company", case1);
    // console.log("Checking company", case2);
    const {role} = req.user
    console.log('req.user',req.user);


    
    // Find company request
    // const isCompany = await RegisterCompany.findOne({
    //   $or: [{ companyNameSlug: case1 }, { companyNameSlug: case2 }],
    // });
    
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

    
  

    if (!isCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
        link: "/not-found",
      });
    }

      console.log("Checking company",isCompany);
    console.log("Checking company",isCompany.companyNameSlug);

    // Return register company
    return res.status(200).json({
      success: true,
      link: `/${isCompany.companyNameSlug}`,
      data: isCompany,
      message: "Company exists",
    });
  } catch (error) {
    console.error("Error fetching company request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getRegisteredCompany;
