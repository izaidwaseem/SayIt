const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 } // Review rating field
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }, // Average rating field
  reviews: [reviewSchema], // Use review schema
  brand: { type: String },
  category: [
    {
      gender: { type: String, required: true },
      type: { type: String, required: true }
    }
  ],
});

module.exports = mongoose.model('Product', productSchema);
