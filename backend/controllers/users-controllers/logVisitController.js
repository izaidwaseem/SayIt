const Visit = require('../../models/visits/visitSchema');

// Middleware to log each visit
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
  
  // Endpoint to get user influx data
  const getUserInflux = async (req, res) => {
    try {
      const visits = await Visit.aggregate([
        {
          $group: {
            _id: { $month: "$timestamp" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        },
        {
          $project: {
            month: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);
  
      res.json(visits);
    } catch (error) {
      console.error('Error fetching user influx:', error);
      res.status(500).json({ error: 'Failed to fetch user influx' });
    }
  };
  
  module.exports = { logVisit, getUserInflux };
  