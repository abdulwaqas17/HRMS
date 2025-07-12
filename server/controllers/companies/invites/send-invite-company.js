const nodemailer = require("nodemailer");
const CompanyRequest = require("../../../models/companies/req-company.model");
const { default: mongoose } = require("mongoose");

const sendInvite = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);

    let companyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Company ID" });
    }

    let isCompanyReq = await CompanyRequest.findById(companyId);

    if (!isCompanyReq) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const { email, emailSubject, emailBody } = req.body;

    console.log(email, emailSubject, emailBody);

    if (!email || !emailSubject || !emailBody) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (email, subject, body)",
      });
    }

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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailSubject,
      html: emailBody,
    });

    isCompanyReq.status = 'invited';
    await isCompanyReq.save();

    return res.status(200).json({
      success: true,
      message: "Email invitation sent successfully",
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

module.exports = sendInvite;
