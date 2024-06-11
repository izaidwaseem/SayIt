// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../../models/users/userSchema');

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user with provided email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token using the secret key from environment variable
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Respond with token
//     res.json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Failed to log in' });
//   }
// };

// module.exports = { loginUser };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/userSchema');
const Admin = require('../../models/admins/adminSchema'); // Import Admin schema

const loginUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    // Check if user with provided email exists in either User or Admin collection based on isAdmin flag
    const user = isAdmin ? await Admin.findOne({ email }) : await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token using the secret key from environment variable
    const token = jwt.sign({ userId: user._id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = { loginUser };
