const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, resetToken) => {
  try {
    // create transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER, // user email address
        pass: process.env.GMAIL_PASS,
      },
    });

    // create message

    const message = {
      to,
      subject: "Password reset",
      html: `
      <p>http://localhost:3000/reset-password/${resetToken}</p>
      `,
    };

    // send the email

    const info = await transporter.sendMail(message);
    console.log("email sennt", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
