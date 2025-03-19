const { createMember, sendQR, createMembers } = require('../controllers/memberController');

const memberRouter = require('express').Router();

// endpoint: /create-member
memberRouter.post('/create-member', createMember);

// endpoint: /send-qr/:eventName
memberRouter.post('/send-qr/:eventName', sendQR);

// endpoint: /create-members
memberRouter.post('/create-members', createMembers);

module.exports = memberRouter;