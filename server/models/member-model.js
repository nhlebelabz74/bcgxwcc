const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
    trim: true,
  },
  avatarFallback: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Member', memberSchema);