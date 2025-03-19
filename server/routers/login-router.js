const { loginController } = require('../controllers');

const loginRouter = require('express').Router();

// endpoint: /login
loginRouter.post('/', loginController);

module.exports = loginRouter;