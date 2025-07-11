const mongoose = require("mongoose");
const User = require("../../models/roles/user.model"); // Adjust path as needed
const Company = require("../../models/companies/company.model");

const getCompanyUsers = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Company ID" });
    }
    // is company exits
    const isCompany = await Company.findById(companyId);
    if (!isCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company request not found" });
    }

    // Fetch users where company matches and role is HR or Employee
    const users = await User.find({
      company: companyId,
      role: { $in: ["hr", "employee"] },
    }).select("-password"); // exclude password for security

    //  .select('name email')         // ✅ sirf name aur email include karo
    // .select('-password -phone')   //  ❌ password ko response se exclude (hide) karo

    // Return fetched users
    res.status(200).json({
      success: true,
      count: users.length,
      users,
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
