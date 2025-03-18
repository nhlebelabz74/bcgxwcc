const { Event } = require('../models');
const { asyncWrapper } = require('../middleware');
const { AES } = require('crypto-js');
const CryptoJS = require('crypto-js');
require('dotenv').config();

// endpoint: /create-event
const createEvent = asyncWrapper(async (req, res) => {
  const { name, date, location, description, partners, limit } = req.body;

  // Create a new event
  await Event.create({
    name: name,
    date: date,
    location: location,
    description: description,
    partners: partners,
    limit: limit
  });

  return res.status(201).json({ message: 'Event created successfully' });
});

// endpoint: /add-rsvp/:eventName
const addRSVP = asyncWrapper(async (req, res) => {
  const { eventName } = req.params;
  const { email } = req.body;

  // Find the event by name
  const event = await Event.findOne({ name: eventName });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if(event.attendance.rsvps.includes(email)) {
    return res.status(400).json({ message: 'Email already RSVPed' });
  }

  // Add the email to the RSVP list
  await Event.updateOne({ name: eventName }, { $push: { 'attendance.rsvps': email } });

  return res.status(200).json({ message: 'RSVP added successfully' });
});

// endpoint: /add-attendee/:eventName/:email
const addAttendee = asyncWrapper(async (req, res) => {
  const { eventName, email } = req.params;

  // Find the event by name
  const event = await Event.findOne({ name: eventName });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if(event.attendance.attended.length >= event.limit) {
    return res.status(400).json({ message: 'Event is at capacity' });
  }

  // the email is encrypted so we have to decrypt it first
  const decryptedEmail = AES.decrypt(email, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

  if(event.attendance.attended.includes(decryptedEmail)) {
    return res.status(400).json({ message: 'Email already recorded as attendee' });
  }

  // Add the email to the attended list
  await Event.updateOne({ name: eventName }, { $push: { 'attendance.attended': decryptedEmail } });

  return res.status(200).json({ message: 'Attendee added successfully' });
});

module.exports = {
  createEvent,
  addRSVP,
  addAttendee
};