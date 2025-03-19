const { createEvent, addRSVP, addAttendee, getAttendees, addRSVPs, sseUpdates } = require('../controllers/eventController');

const eventRouter = require('express').Router();

// endpoint: /create-event
eventRouter.post('/create-event', createEvent);

// endpoint: /add-rsvp/:eventName
eventRouter.post('/add-rsvp/:eventName', addRSVP);

// endpoint: /add-attendee/:eventName/:email
eventRouter.post('/add-attendee/:eventName/:email', addAttendee);

// endpoint: /add-rsvps/:eventName
eventRouter.post('/add-rsvps/:eventName', addRSVPs);

// endpoint: /get-attendees/:eventName
eventRouter.get('/get-attendees/:eventName', getAttendees);

// endpoint: /updates
eventRouter.get('/updates', sseUpdates);

module.exports = eventRouter;