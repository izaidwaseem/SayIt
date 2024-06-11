const express = require('express');
const { predictSentiment } = require('../../controllers/modelController/modelController');
const router = express.Router();

router.post('/predict', predictSentiment);

module.exports = router;
