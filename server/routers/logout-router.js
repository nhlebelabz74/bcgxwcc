const { logoutController } = require('../controllers');

const logoutRouter = require('express').Router();

// endpoint: /logout
logoutRouter.post('/', logoutController);

module.exports = logoutRouter;