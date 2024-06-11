const axios = require('axios');

exports.predictSentiment = async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post('http://localhost:5000/predict', { text });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error in communication with Flask server' });
    }
};
