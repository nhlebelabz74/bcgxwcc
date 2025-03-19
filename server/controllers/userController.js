const { User } = require('../models');
const { asyncWrapper } = require('../middleware');

// endpoint: /create-user
const createUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Create a new user
  await User.create({
    email: email,
    password: password
  });

  return res.status(201).json({ message: 'User created successfully' });
});

// endpoint: /create-users
const createUsers = asyncWrapper(async (req, res) => {
  const { users } = req.body; // array of users

  // Validate that users is an array
  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'Invalid users data. Expected a non-empty array.' });
  }

  // Create multiple users
  await User.insertMany(users, {
    validate: true,
    ignoreDuplicates: true,
    ordered: false
  });

  return res.status(201).json({ message: 'Users created successfully' });
});

module.exports = {
  createUser,
  createUsers
};