from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import json
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId  # Import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB client setup
client = MongoClient('mongodb://localhost:27017/')
db = client['wearablesDB']
products_collection = db['products']

# Load the model
model = load_model('../model/sentiment_model.h5')

# Load the tokenizer from the JSON file
with open('../model/tokenizer.json', 'r') as handle:
    tokenizer_config = json.load(handle)
    tokenizer = tokenizer_from_json(tokenizer_config)

# Preprocessing function
def preprocess_text(text):
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequences = pad_sequences(sequences, maxlen=100, padding='post', truncating='post')
    return padded_sequences

# Prediction endpoint for stored reviews
@app.route('/predict_stored_reviews/<product_id>', methods=['GET'])
def predict_stored_reviews(product_id):
    try:
        print(f"Fetching product with ID: {product_id}")  # Debugging statement
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        reviews = product.get('reviews', [])
        print(f"Reviews: {reviews}")  # Debugging statement
        positive_count = 0
        negative_count = 0
        for review in reviews:
            padded_sequences = preprocess_text(review['review'])
            prediction = model.predict(padded_sequences)
            if prediction > 0.5:
                positive_count += 1
            else:
                negative_count += 1
        return jsonify({
            'positive_reviews': positive_count,
            'negative_reviews': negative_count
        })
    except Exception as e:
        print(f"Error: {str(e)}")  # Debugging statement
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
