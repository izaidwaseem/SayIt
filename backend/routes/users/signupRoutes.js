const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getAUser } = require('../../controllers/users-controllers/signupController');

// Routes
router.post('/signup', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getAUser);


module.exports = router;
