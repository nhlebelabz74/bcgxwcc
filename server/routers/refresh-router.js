const { refreshController } = require('../controllers');

const refreshRouter = require('express').Router();

// endpoint: /refresh
refreshRouter.get('/', refreshController);

module.exports = refreshRouter;