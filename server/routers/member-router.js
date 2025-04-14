const { createMember, sendQR, createMembers, sendEventEmail, sendEventEmailTest } = require('../controllers/memberController');

const memberRouter = require('express').Router();

// endpoint: /create-member
memberRouter.post('/create-member', createMember);

// endpoint: /send-qr/:eventName
memberRouter.post('/send-qr/:eventName', sendQR);

// endpoint: /send-event-email/:eventName
memberRouter.post('/send-event-email/:eventName', sendEventEmail);

// endpoint: /send-event-email-test/:eventName
memberRouter.post('/send-event-email-test/:eventName', sendEventEmailTest);

// endpoint: /create-members
memberRouter.post('/create-members', createMembers);

module.exports = memberRouter;