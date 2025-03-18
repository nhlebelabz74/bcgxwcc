const { Member, Event } = require('../models');
const { asyncWrapper } = require('../middleware');
const sendEmail = require('../utils/send-email');
const { QR_emailHtml, thankYou_emailHtml } = require('../constants');
const generateQR = require('../utils/generateQR');
require('dotenv').config();
const { AES } = require('crypto-js');

// endpoint: /create-member
const createMember = asyncWrapper(async (req, res) => {
  const { fullname, email } = req.body;

  // Create a new member
  await Member.create({
    fullname: fullname,
    email: email
  });

  return res.status(201).json({ message: 'Member created successfully' });
});

// endpoint: /send-qr/:eventName
const sendQR = asyncWrapper(async (req, res) => {
  const { eventName } = req.params;

  const event = await Event.findOne({ name: eventName });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  try {
    // Use Promise.all to wait for all emails to be sent
    await Promise.all(event.attendance.rsvps.map(async (email) => {
      try {
        const member = await Member.findOne({ email: email });

        if (!member) return;

        // create encrypted email for the request (precaution)
        const encryptedEmail = AES.encrypt(email, process.env.ENCRYPTION_KEY).toString();

        const qrLink = `${process.env.BACKEND_URL}/api/v1/add-attendee/${eventName}/${encryptedEmail}`;
        const qrCode = await generateQR({ link: qrLink });

        const qrCodeBuffer = Buffer.from(
          qrCode.replace(/^data:image\/\w+;base64,/, ''), 
          'base64'
        );
        const attachments = [{
          filename: `WCC_x_BCG_Opening_Event_QR_-_${member.fullname}.png`.split('_').join(' '),
          content: qrCodeBuffer,
          cid: 'qrcode'
        }];

        await sendEmail({
          receiver_email: email,
          subject: 'Thanks for RSVPing for our event',
          html: QR_emailHtml({ name: member.fullname }), // Removed link parameter
          attachments: attachments
        });
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        // Throw the error to be caught by the outer Promise.all
        throw error;
      }
    }));
    
    return res.status(200).json({ message: 'QR codes sent successfully' });
  } catch (error) {
    console.error('Error in batch email sending:', error);
    return res.status(500).json({ message: 'QR codes generation failed', error: error.message });
  }
});

// add sendThankYou function here

module.exports = {
  createMember,
  sendQR,
  // add sendThankYou here
};