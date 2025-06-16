// controllers/companyRequests/createCompanyRequest.js

const CompanyRequest = require('../../models/companies/request.model');
const { isValidEmail, isValidPhone } = require('../../utils/validations');

// Controller to handle company request creation
const createCompanyRequest = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const {
      companyName,
      companyEmail,
      companyPhone,
      adminName,
      industry,
      employeeRange,
      message,
    } = req.body;

    // Step 2: Optional - Backend validation before mongoose (double-check frontend)
    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !adminName ||
      !industry ||
      !employeeRange
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

       // 📧 Email format check
    if (!isValidEmail(companyEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format (e.g., you@example.com)' });
    }

    // 📱 Phone format check
    if (!isValidPhone(companyPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number (include country code, e.g., +92...)',
      });
    }

    // Step 3: Create new request document
    const newRequest = new CompanyRequest({
      companyName,
      companyEmail,
      companyPhone,
      adminName,
      industry,
      employeeRange,
      message, // Optional
    
    });

    // Step 4: Save to DB
    await newRequest.save();

    // Step 5: Send response
    return res.status(201).json({
      success: true,
      message: "Company request submitted successfully",
      data: newRequest
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

module.exports = createCompanyRequest;
