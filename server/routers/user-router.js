const { createUser } = require('../controllers');

const userRouter = require('express').Router();

// endpoint: /create-user
userRouter.post('/create-user', createUser);

module.exports = userRouter;