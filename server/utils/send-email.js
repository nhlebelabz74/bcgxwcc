const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ receiver_email, subject, html, attachments }) => {
    const company_email = process.env.COMPANY_EMAIL;
    const BATCH_SIZE = 50; // Most providers recommend 50-100 emails per batch

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: company_email,
          pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    });

    // Single recipient case
    if (!Array.isArray(receiver_email)) {
      const mailOptions = {
        from: `"Wits Consulting Club" <${company_email}>`,
        to: receiver_email,
        subject: subject,
        html: html,
        attachments: attachments
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true };
      } catch (error) {
        console.error('Email failed:', error.toString());
        return { success: false, error: error.toString() };
      }
    }

    // Multiple recipients case - batch processing
    try {
      let successCount = 0;
      let failCount = 0;
      let errors = [];

      // Split emails into batches
      for (let i = 0; i < receiver_email.length; i += BATCH_SIZE) {
        const batch = receiver_email.slice(i, i + BATCH_SIZE);
        
        const mailOptions = {
          from: `"Wits Consulting Club" <${company_email}>`,
          to: company_email,
          subject: subject,
          html: html,
          attachments: attachments,
          bcc: batch.join(', ')
        };

        try {
          console.log(`Sending batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(receiver_email.length/BATCH_SIZE)} with ${batch.length} recipients`);
          const info = await transporter.sendMail(mailOptions);
          console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} sent:`, info.response);
          successCount += batch.length;
          
          // Add a small delay between batches to avoid rate limiting
          if (i + BATCH_SIZE < receiver_email.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Batch ${Math.floor(i/BATCH_SIZE) + 1} failed:`, error.toString());
          failCount += batch.length;
          errors.push(error.toString());
        }
      }

      if (failCount === 0) {
        return { success: true, sent: successCount };
      } else {
        return { 
          partialSuccess: true, 
          sent: successCount, 
          failed: failCount,
          errors: errors
        };
      }
    } catch (error) {
      console.error('Email batching failed:', error.toString());
      return { success: false, error: error.toString() };
    }
};

module.exports = sendEmail;