const express = require('express');
const router = express.Router();
const { loginUser } = require('../../controllers/users-controllers/loginController');

router.post('/login', loginUser);

module.exports = router;