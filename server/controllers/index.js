const { createUser, createUsers } = require('./userController');
const { createEvent, addRSVP, addRSVPs, addAttendee, getAttendees, sseUpdates } = require('./eventController');
const { sendQR, createMember, createMembers } = require('./memberController');

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
  getAttendees,
  createUsers,
  loginController,
  logoutController,
  refreshController
};