import axios from 'axios';
import { useState } from 'react';

const Predict = () => {
    const [input, setInput] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', { text: input });
            setPrediction(response.data.sentiment);
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Predict Sentiment</h2>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your message"
                rows="4"
                cols="50"
                style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
            <br />
            <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>Predict</button>
            {prediction && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Prediction:</h3>
                    <p>{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default Predict;
