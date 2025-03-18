const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  }
});

module.exports = mongoose.model('User', userSchema);