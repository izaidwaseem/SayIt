// controllers/adminRegistrationController.js
const bcrypt = require('bcrypt');
const Admin = require('../../models/admins/adminSchema');

// Admin registration endpoint
const registerAdmin = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if admin with provided email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create a new admin
    const newAdmin = new Admin({ email, password, name });

    // Save the new admin
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Failed to register admin' });
  }
};

module.exports = { registerAdmin };
