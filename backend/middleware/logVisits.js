const Visit = require('../models/visits/visitSchema');

const logVisit = async (req, res, next) => {
  try {
    const newVisit = new Visit();
    await newVisit.save();
    next();
  } catch (error) {
    console.error('Error logging visit:', error);
    next();
  }
};

module.exports = logVisit;
