const User = require('../../models/users/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 20; // Number of salt rounds for bcrypt

// Create a new user
const createUser = async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
  
      // Check if password matches confirmPassword
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user instance with hashed password
      const newUser = new User({
        username,
        email,
        password: hashedPassword // Store the hashed password
      });
  
      // Save the user to the database
      const user = await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
const getAUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = { createUser, getAllUsers, getAUser };
