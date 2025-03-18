const userRouter = require('./user-router');
const eventRouter = require('./event-router');
const memberRouter = require('./member-router');
const loginRouter = require('./login-router');
const logoutRouter = require('./logout-router');
const refreshRouter = require('./refresh-router');

module.exports = {
  userRouter,
  eventRouter,
  memberRouter,
  loginRouter,
  logoutRouter,
  refreshRouter
};