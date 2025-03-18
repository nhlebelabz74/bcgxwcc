const { createEvent, addRSVP, addAttendee } = require('../controllers/eventController');

const eventRouter = require('express').Router();

// endpoint: /create-event
eventRouter.post('/create-event', createEvent);

// endpoint: /add-rsvp/:eventName
eventRouter.post('/add-rsvp/:eventName', addRSVP);

// endpoint: /add-attendee/:eventName/:email
eventRouter.post('/add-attendee/:eventName/:email', addAttendee);

module.exports = eventRouter;