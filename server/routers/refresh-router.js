const { refreshController } = require('../controllers');

const refreshRouter = require('express').Router();

// endpoint: /refresh
refreshRouter.get('/refresh', refreshController);

module.exports = refreshRouter;