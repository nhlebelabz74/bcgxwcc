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

// endpoint: /create-members
const createMembers = asyncWrapper(async (req, res) => {
  const { members } = req.body; // array of members

  // Validate that members is an array
  if (!Array.isArray(members) || members.length === 0) {
    return res.status(400).json({ message: 'Invalid members data. Expected a non-empty array.' });
  }

  // Extract emails from the incoming members
  const emails = members.map(member => member.email.toLowerCase());

  // Check which members already exist in the database
  const existingMembers = await Member.find({ email: { $in: emails } });

  // Extract emails of existing members
  const existingEmails = existingMembers.map(member => member.email.toLowerCase());

  // Filter out members who are already in the database
  const newMembers = members.filter(member => !existingEmails.includes(member.email.toLowerCase()));

  // If no new members to add, return a message
  if (newMembers.length === 0) {
    return res.status(200).json({ message: 'All members already exist in the database.' });
  }

  // Create only the new members
  await Member.insertMany(newMembers, {
    validate: true,
    ordered: false,
    ignoreDuplicates: true
  });

  return res.status(201).json({ message: 'Members created successfully', newMembers });
});

// endpoint: /send-qr/:eventName
const sendQR = asyncWrapper(async (req, res) => {
  const { eventName } = req.params;

  // Find the event by name
  const event = await Event.findOne({ name: eventName });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  try {
    // Function to introduce a delay
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Loop through each RSVP email
    for (const email of event.attendance.rsvps) {
      try {
        // Find the member by email
        const member = await Member.findOne({ email: email });

        if (!member) continue; // Skip if member not found

        // Create encrypted email for the request (precaution)
        const encryptedEmail = AES.encrypt(email, process.env.ENCRYPTION_KEY).toString();

        // Generate the QR code link
        const qrLink = `${process.env.BACKEND_URL}/api/v1/add-attendee/${eventName}/${encodeURIComponent(encryptedEmail)}`;

        // Generate the QR code image
        const qrCode = await generateQR({ link: qrLink });

        // Convert QR code to buffer for email attachment
        const qrCodeBuffer = Buffer.from(
          qrCode.replace(/^data:image\/\w+;base64,/, ''), 
          'base64'
        );

        // Prepare email attachments
        const attachments = [{
          filename: `WCC_x_BCG_Opening_Event_QR_-_${member.fullname}.png`.split('_').join(' '),
          content: qrCodeBuffer,
          cid: 'qrcode'
        }];

        // Send the email
        await sendEmail({
          receiver_email: email,
          subject: 'Thanks for RSVPing for our event',
          html: QR_emailHtml({ name: member.fullname }), // Your email template function
          attachments: attachments
        });

        console.log(`Email sent to ${email}`);

        // Add a delay of 2 seconds (2000 milliseconds) between each email
        await wait(2000);
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        // Continue processing other emails even if one fails
      }
    }

    // Return success response
    return res.status(200).json({ message: 'QR codes sent successfully' });
  } catch (error) {
    console.error('Error in batch email sending:', error);
    return res.status(500).json({ message: 'QR codes generation failed', error: error.message });
  }
});

// add sendThankYou function here

module.exports = {
  createMember,
  createMembers,
  sendQR,
  // add sendThankYou here
};