const { createUser, createUsers } = require('../controllers');

const userRouter = require('express').Router();

// endpoint: /create-user
userRouter.post('/create-user', createUser);

// endpoint: /create-users
userRouter.post('/create-users', createUsers);

module.exports = userRouter;