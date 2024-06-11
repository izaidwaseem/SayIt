const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users-controllers/userController');

// Route to update user role
router.put('/users/:userId/updateRole', userController.updateUserRole);

// Route to edit user details
router.put('/users/:userId', userController.editUser);

// Route to delete user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
