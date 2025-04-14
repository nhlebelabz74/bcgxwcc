const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ receiver_email, subject, html, attachments }) => {
    const company_email = process.env.COMPANY_EMAIL;

    // check if receiver_email is an array
    const isMultipleEmails = Array.isArray(receiver_email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: company_email,
          pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Wits Consulting Club" <${company_email}>`,
      to: isMultipleEmails ? company_email : receiver_email,
      subject: subject,
      html: html,
      attachments: attachments,
      bcc: isMultipleEmails ? receiver_email.join(', ') : '', // BCC to the company email for record-keeping
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true };
    } catch (error) {
      console.error('Email failed:', error.toString());
      return { success: false, error: error.toString() };
    }
};

module.exports = sendEmail;