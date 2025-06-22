const nodemailer = require("nodemailer");

const sendInvite = async (req, res) => {
  try {
    const { email, subject, body } = req.body;

    console.log(email, subject, body);
    

    if (!email || !subject || !body) {
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
      subject: subject,
      html: body,
    });

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
