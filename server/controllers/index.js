const { createUser, createUsers } = require('./userController');
const { createEvent, addRSVP, addRSVPs, addAttendee, getAttendees, sseUpdates, sendThankYouEmails } = require('./eventController');
const { sendQR, createMember, createMembers, sendEventEmail, sendEventEmailTest } = require('./memberController');

const loginController = require('./loginController');
const logoutController = require('./logoutController');
const refreshController = require('./refreshController');

module.exports = {
  createUser,
  sseUpdates,
  createEvent,
  createMembers,
  addRSVP,
  addRSVPs,
  addAttendee,
  sendQR,
  createMember,
  sendEventEmail,
  sendEventEmailTest,
  getAttendees,
  sendThankYouEmails,
  createUsers,
  loginController,
  logoutController,
  refreshController
};