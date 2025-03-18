const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  rsvps: {
    type: [String],
    default: [],
  },
  attended: {
    type: [String],
    default: [],
  },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  partners: {
    type: [String], // for now, just an array of strings
    default: [],
  },
  attendance: {
    type: attendanceSchema,
    default: {
      rsvps: [],
      attended: [],
    },
  },
  limit: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Event', eventSchema);