const { Event, Member } = require('../models');
const { asyncWrapper } = require('../middleware');
const { AES } = require('crypto-js');
const CryptoJS = require('crypto-js');
require('dotenv').config();

const clients = new Set(); // Track connected clients

// New SSE endpoint controller
const sseUpdates = asyncWrapper(async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial heartbeat
  res.write(':\n\n');
  const heartbeat = setInterval(() => res.write(':\n\n'), 30000);

  clients.add(res);
  
  req.on('close', () => {
    clearInterval(heartbeat);
    clients.delete(res);
    res.end();
  });
});

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

  // make sure the are a member
  const member = await Member.findOne({ email: email });
  if (!member) {
    return res.status(404).json({ message: 'Member not found'});
  }

  // Add the email to the RSVP list
  await Event.updateOne({ name: eventName }, { $push: { 'attendance.rsvps': email } });

  return res.status(200).json({ message: 'RSVP added successfully' });
});

// endpoint: /add-rsvps/:eventName
const addRSVPs = asyncWrapper(async (req, res) => {
  const { eventName } = req.params;
  let { emails } = req.body; // array of emails

  // Validate that emails is an array
  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: 'Invalid emails data. Expected a non-empty array.' });
  }

  // Find the event by name
  const event = await Event.findOne({ name: eventName });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  //make all the emails lowercase
  emails = emails.map(email => email.toLowerCase());

  // Filter out emails that have already RSVPed
  const newEmails = emails.filter(email => !event.attendance.rsvps.includes(email));

  // If all emails have already RSVPed
  if (newEmails.length === 0) {
    return res.status(400).json({ message: 'All provided emails have already RSVPed' });
  }

  // Fetch members whose emails are in the newEmails list
  const members = await Member.find({ email: { $in: newEmails } });
  const memberEmails = members.map(member => member.email);

  // Identify emails that are not members
  const nonMemberEmails = newEmails.filter(email => !memberEmails.includes(email));

  // Add only the valid member emails to the RSVP list
  if (memberEmails.length > 0) {
    await Event.updateOne(
      { name: eventName },
      { $push: { 'attendance.rsvps': { $each: memberEmails } } }
    );
  }

  return res.status(200).json({
    message: 'RSVPs processed successfully',
    addedEmails: memberEmails,
    nonMemberEmails: nonMemberEmails.length > 0 ? nonMemberEmails : null
  });
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

  // check that they are a member (We need the information later)
  const member = await Member.findOne({ email: decryptedEmail });
  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  await Event.updateOne({ name: eventName }, { 
    $push: { 'attendance.attended': decryptedEmail } 
  });

  // Broadcast to all connected clients
  const memberData = {
    fullname: member.fullname,
    email: member.email
  };

  clients.forEach(client => {
    client.write(`event: new-member\n`);
    client.write(`data: ${JSON.stringify(memberData)}\n\n`);
  });

  return res.status(200).json({ 
    message: 'Attendee added successfully', 
    member: member 
  });
});

// endpoint: /get-attendees/:eventName
const getAttendees = asyncWrapper(async (req, res) => {
  const { eventName } = req.params;

  // Find the event by name
  const event = await Event.findOne({
    name: eventName
  });

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  // get an array of members who attended the event
  const members = await Member.find({ email: { $in: event.attendance.attended } });

  const attendees = members.map(member => {
    return {
      fullname: member.fullname,
      email: member.email,
    };
  });

  return res.status(200).json({ attendees: attendees });
});

module.exports = {
  createEvent,
  addRSVP,
  addAttendee,
  getAttendees,
  addRSVPs,
  sseUpdates
};