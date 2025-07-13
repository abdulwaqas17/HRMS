const nodemailer = require("nodemailer");
const CompanyRequest = require("../../../models/companies/req-company.model");
const RegCompany = require("../../../models/companies/reg-company.model");
const { isValidPhone, isValidEmail } = require("../../../utils/validations");

const inviteCompany = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAdmin,
      industry,
      employeeRange,
    } = req.body;

    // Step 2: Validate required fields
    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !companyAdmin ||
      !industry ||
      !employeeRange
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Step 3: Format Validations
    if (!isValidEmail(companyEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format (e.g., you@example.com)",
      });
    }

    if (!isValidPhone(companyPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number (e.g., include +92)",
      });
    }

    // Step 5: Case-insensitive regex query for name and email
    const nameQuery = { companyName: new RegExp(`^${companyName}$`, "i") };
    const emailQuery = { companyEmail: new RegExp(`^${companyEmail}$`, "i") };

    // Step 6: Check for duplicate company name in both collections
    const isDuplicateName =
      (await CompanyRequest.exists(nameQuery)) ||
      (await RegCompany.exists(nameQuery));

    if (isDuplicateName) {
      return res.status(409).json({
        success: false,
        message: "A company with this name already exists",
      });
    }

    // Step 7: Check for duplicate company email in both collections
    // const isDuplicateEmail =
    //   (await CompanyRequest.exists(emailQuery)) ||
    //   (await RegCompany.exists(emailQuery));

    // if (isDuplicateEmail) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "A company with this email already exists",
    //   });
    // }

    // Step 5: Save the new company request
    const newRequest = await CompanyRequest.create({
      companyName,
      companyEmail,
      companyPhone,
      companyAdmin,
      industry,
      employeeRange,
      status: "invited",
    });

    // Step 6: Send Email Invitation
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email credentials are not configured",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: companyEmail,
      subject: `Invitation to join HRPro - ${companyName}`,
      html: `
        <p>Dear ${companyAdmin || "Admin"},</p>
        <p>We're pleased to invite you to join our HR management platform.</p>
        <p>Please click the link below to complete your registration:</p>
        <p><a href="http://localhost:5173/company-register/${
          newRequest._id
        }" target="_blank">Click here to register</a></p>
        <p>Best regards,<br/>HRPro Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Step 7: Success response
    return res.status(200).json({
      success: true,
      message: "Company invited successfully. Email has been sent.",
    });
  } catch (error) {
    console.error("Error in inviting company:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = inviteCompany;
