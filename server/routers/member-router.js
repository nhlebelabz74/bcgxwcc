const { createMember, sendQR } = require('../controllers/memberController');

const memberRouter = require('express').Router();

// endpoint: /create-member
memberRouter.post('/create-member', createMember);

// endpoint: /send-qr/:eventName
memberRouter.post('/send-qr/:eventName', sendQR);

module.exports = memberRouter;