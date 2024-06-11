const express = require('express');
const router = express.Router();
const { logVisit, getUserInflux } = require('../../controllers/users-controllers/logVisitController');

// Apply logVisit middleware to all routes
router.use(logVisit);

// Route to get user influx data
router.get('/user-influx', getUserInflux);

module.exports = router;

