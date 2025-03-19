const { refreshController } = require('../controllers');

const refreshRouter = require('express').Router();

// endpoint: /refresh
refreshRouter.post('/', refreshController);

module.exports = refreshRouter;