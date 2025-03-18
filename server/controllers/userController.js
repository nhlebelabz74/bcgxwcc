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

module.exports = {
  createUser,
};