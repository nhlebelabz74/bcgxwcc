const { loginController } = require('../controllers');

const loginRouter = require('express').Router();

// endpoint: /login
loginRouter.post('/login', loginController);

module.exports = loginRouter;