const { refreshController } = require('../controllers');

const refreshRouter = require('express').Router();

// endpoint: /refresh
refreshRouter.post('/refresh', refreshController);

module.exports = refreshRouter;