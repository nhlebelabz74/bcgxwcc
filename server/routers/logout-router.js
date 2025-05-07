const { logoutController } = require('../controllers');

const logoutRouter = require('express').Router();

// endpoint: /logout
logoutRouter.post('/logout', logoutController);

module.exports = logoutRouter;